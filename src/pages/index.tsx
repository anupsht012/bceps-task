import { useQuery } from '@apollo/client';
import { GET_CONTINENTS_DATA } from '../graphql/queries';
import client from '../libs/apollo-client';
import BarChart from '../../components/charts/BarChart';
import CountriesLanguagesList from '../../components/countriesLanguageList';
import CountryList from '../../components/countriesList';
import ContinentChart from '../../components/continentChart';
import {CountriesLanguagesTable} from '../../components/countriesLanguagesTable';

const Home = () => {
  const { data, loading, error } = useQuery(GET_CONTINENTS_DATA, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // const mockData = {
  //   continents: [
  //     { name: 'Asia', countries: [{ name: 'India' }, { name: 'China' }] },
  //     { name: 'Europe', countries: [{ name: 'Germany' }, { name: 'France' }] },
  //     { name: 'Africa', countries: [{ name: 'Nigeria' }] },
  //   ],
  // }
  return (
    <div className='mx-auto max-w-7xl'>
      {/* {data.continents.map((continent: any) => (
        <div key={continent.code}>
          <h2>{continent.name}</h2>
          <ul>
            {continent.countries.map((country: any) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
        </div>
      ))} */}
      {/* <div className="container mx-auto p-4">
        */}
      <div className='my-8'>
        <h1 className="text-center text-4xl my-10">
          Number of countries in each continent in Bar Chart using Chart.js
        </h1>
        <div className="grid grid-cols-4 gap-4">
          <BarChart data={data} />
        </div>
      </div>
      <div>
        {/* <CountriesLanguagesList/> */}
        <ContinentChart />
        <CountriesLanguagesTable />
        {/* <CountryList/> */}
      </div>
      {/*
       
      </div> */}
    </div>
  );
};

export default Home;
