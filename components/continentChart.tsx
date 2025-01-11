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
              backgroundColor: 'rgba(59, 16, 275, 0.6)',
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
    <section className="my-5">
      <div className="container  mx-auto mt-8 px-4">
        <h1 className="text-center text-4xl font-bold mb-6">Select to view Continent Data</h1>

        <div className="mb-6">
          <Dropdown
            placeholder="Select Continent to view language spoken in each country"
            fluid
            selection
            options={continentOptions}
            onChange={(e, { value }) => setSelectedContinent(value as string)}
          />
        </div>
        {
          chartData && (
            <div className="mt-14">
              <h2 className="text-center text-2xl font-semibold mb-4">
                Number of languages spoken in Countries
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
        <hr />
        {
          chartData && (
            <div className="flex flex-col align-middle mt-14" style={{ width: '50rem', height: '50rem' }}>
              <h2 className="text-center text-2xl font-semibold mb-4">
                Countries and Languages
              </h2>
              <Pie
                data={{
                  datasets: [
                    {
                      label: 'Language',
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
                  labels: chartData.labels,

                }}
              />
            </div>
          )
        }



      </div >
    </section>
  );
};

export default ContinentChart;
