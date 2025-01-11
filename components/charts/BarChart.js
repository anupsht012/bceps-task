import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data?.continents?.map((c) => c.name) || [],
    datasets: [
      {
        label: 'Number of Countries',
        data: data?.continents?.map((c) => c.countries.length) || [],
        backgroundColor: 'rgba(29, 882, 52, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top' ,
      // },
      // title: {
      //   display: true,
      //   text: 'Number of Countries by Continent',
      // },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
