import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_ALL_COUNTRIES } from '../src/graphql/queries';
import client from '../src/libs/apollo-client';

const CountryList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES , { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Country List</h1>
      <ul>
        {data.countries.map((country: any) => (
          <li key={country.code}>
            <Link href={`/country/${country.code}`}>
              <p>{country.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
