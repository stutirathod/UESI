import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RegistrationChart = ({ program }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const [timeScale, setTimeScale] = useState('hour'); // Default to hour

  useEffect(() => {
    if (!program || !program.registeredUsers || program.registeredUsers.length === 0) return;

    const registrations = program.registeredUsers.map((user) => new Date(user.time));

    let dataMap = new Map();

    if (timeScale === 'hour') {
      for (let i = 0; i < 24; i++) dataMap.set(i, 0);
      registrations.forEach((date) => {
        const key = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} - ${date.getHours()}:00`;
        dataMap.set(key, (dataMap.get(key) || 0) + 1);
      });
      setLabels([...dataMap.keys()]);
    } else if (timeScale === 'day') {
      const days = new Set(registrations.map((date) => date.toDateString())); // Unique days
      [...days].forEach((day) => dataMap.set(day, 0));
      registrations.forEach((date) => dataMap.set(date.toDateString(), (dataMap.get(date.toDateString()) || 0) + 1));
      setLabels([...dataMap.keys()]);
    } else if (timeScale === 'month') {
      for (let i = 0; i < 12; i++) dataMap.set(i, 0);
      registrations.forEach((date) => dataMap.set(date.getMonth(), (dataMap.get(date.getMonth()) || 0) + 1));
      setLabels([...dataMap.keys()].map((month) => new Date(0, month).toLocaleString('default', { month: 'short' })));
    }

    setDataPoints([...dataMap.values()]);
  }, [program, timeScale]); // Recalculate when timeScale changes

  const peakIndex = dataPoints.indexOf(Math.max(...dataPoints));

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `User Registrations Per ${timeScale.charAt(0).toUpperCase() + timeScale.slice(1)}` },
      tooltip: {
        callbacks: {
          label: (context) =>
            context.dataIndex === peakIndex ? `🔥 Peak: ${context.raw} users` : `${context.raw} users`,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Registrations per ${timeScale}`,
        data: dataPoints,
        borderColor: 'rgb(152, 109, 2)',
        backgroundColor: 'rgba(152, 109, 2, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(152, 109, 2)',
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Select Time Scale:</label>
        <select value={timeScale} onChange={(e) => setTimeScale(e.target.value)} style={{ padding: '5px' }}>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
        </select>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default RegistrationChart;
