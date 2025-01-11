import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import client from '../../libs/apollo-client';
import { GET_COUNTRY } from '@/graphql/queries';



const CountryDetail = () => {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: query.code },
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
    <section>
      <div className="container mx-auto max-w-7xl text-center mt-16">
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
      </div>
    </section>
  );
};

export default CountryDetail;




