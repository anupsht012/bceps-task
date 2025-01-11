import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import client from '../../libs/apollo-client';

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const CountryDetail = () => {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: query.code },
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
    <div>
      <h1>{data.country.name}</h1>
      <p>Native Name: {data.country.native}</p>
      <p>Capital: {data.country.capital}</p>
      <p>Currency: {data.country.currency}</p>
      <h3>Languages:</h3>
      <ul>
        {data.country.languages.map((lang: any) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetail;
// import React from 'react';
// import CountryDetail from '../../../components/countryDetail';

// const CountryPage: React.FC = () => {
//   return <CountryDetail />;
// };

// export default CountryPage;



