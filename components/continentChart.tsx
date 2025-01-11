import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Bar, Pie } from 'react-chartjs-2';
import { Dropdown } from 'semantic-ui-react';
import { GET_CONTINENTS_DATA } from '@/graphql/queries';
import client from '../src/libs/apollo-client';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ContinentChart = () => {
  const { data, loading, error } = useQuery(GET_CONTINENTS_DATA, { client });
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data && selectedContinent) {
      const continent = data.continents.find(
        (cont: any) => cont.code === selectedContinent
      );

      if (continent) {
        const countries = continent.countries;
        const countryNames = countries.map((country: any) => country.name);
        const languageCounts = countries.map(
          (country: any) => country.languages.length
        );

        setChartData({
          labels: countryNames,
          datasets: [
            {
              label: 'Languages per Country',
              data: languageCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [data, selectedContinent]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const continentOptions = data.continents.map((continent: any) => ({
    key: continent.code,
    value: continent.code,
    text: continent.name,
  }));

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-4xl font-bold mb-6">Continent Data</h1>

      {/* Continent Selector */}
      <div className="mb-6">
        <Dropdown
          placeholder="Select Continent"
          fluid
          selection
          options={continentOptions}
          onChange={(e, { value }) => setSelectedContinent(value as string)}
        />
      </div>
      <div className='grid grid-cols-2'>
      {
    chartData && (
      <div>
        <h2 className="text-center text-2xl font-semibold mb-4">
          Languages Distribution by Country
        </h2>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Languages',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Countries',
                },
              },
            },
          }}
        />
      </div>
    )
  }

{
    chartData && (
      <div className="mt-8">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Language Proportion
        </h2>
        <Pie
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Language Proportion',
                data: chartData.datasets[0].data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    )
  }

    </div>
      
     
  {/* Optional Pie Chart */ }

    </div >
  );
};

export default ContinentChart;
