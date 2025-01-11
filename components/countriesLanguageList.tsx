import React from 'react'
import { useQuery, gql } from '@apollo/client';
import client from '../src/libs/apollo-client';
import { GET_COUNTRIES_AND_LANGUAGES } from '@/graphql/queries';

const CountriesLanguagesList = () => {
    const { data, loading, error } = useQuery(GET_COUNTRIES_AND_LANGUAGES, { client });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className="container mx-auto mt-8 px-4">
      <p className="text-center text-violet-500 text-5xl mt-12">Countries and Languages</p>
      <div className="space-y-6 mt-8">
        {data.countries.map((country: any) => (
          <div key={country.code} className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-violet-700">{country.name} ({country.code})</h2>
            <div className="mt-4">
              <strong>Languages:</strong>
              {country.languages.length > 0 ? (
                <ul className="mt-2 list-disc pl-5">
                  {country.languages.map((lang: any) => (
                    <li key={lang.code} className="text-lg text-gray-700">{lang.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-600">No languages listed.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    
  };
  

export default CountriesLanguagesList