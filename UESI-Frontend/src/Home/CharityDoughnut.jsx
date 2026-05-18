import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CharityDoughnut = ({ requiredAmount, receivedAmount }) => {
  const remainingAmount = Math.max(requiredAmount - receivedAmount, 0); // Prevent negative values

  const data = {
    labels: ['Received Amount', 'Remaining Amount'],
    datasets: [
      {
        label: 'Charity Progress',
        data: [receivedAmount, remainingAmount],
        backgroundColor: [
          'rgba(100, 167, 111, 0.7)', // Received - Greenish
          'rgb(248, 136, 136)', // Remaining - Reddish
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>Charity Progress</h3>

      <Doughnut data={data} />
    </div>
  );
};

export default CharityDoughnut;
