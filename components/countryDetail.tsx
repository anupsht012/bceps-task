import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_DETAILS_WITH_CODE } from '@/graphql/queries';

const CountryDetail: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;

  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS_WITH_CODE , {
    variables: { code },
    skip: !code, // Skip query if `code` is undefined
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  const country = data.country;

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Continent: {country.continent.name}</p>
      <p>Currency: {country.currency}</p>
      <p>Languages:</p>
      <ul>
        {country.languages.map((lang: any) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetail;
