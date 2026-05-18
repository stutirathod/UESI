import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from "./ProgramsPage.module.css";// Import CSS module

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VideoViewChart = ({ videos }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [numVideos, setNumVideos] = useState(5); // Default to top 5 videos

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const sortedVideos = [...videos]
      .sort((a, b) => b.views - a.views)
      .slice(0, numVideos);

    const labels = sortedVideos.map((video) => video.title);
    const data = sortedVideos.map((video) => video.views);

    setChartData({
      labels,
      datasets: [
        {
          label: 'View Count',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  }, [videos, numVideos]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Top ${numVideos} Videos by View Count` },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.selectContainer}>
        <label>Select Top Videos: </label>
        <select value={numVideos} onChange={(e) => setNumVideos(Number(e.target.value))}>
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.chartWrapper}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default VideoViewChart;
