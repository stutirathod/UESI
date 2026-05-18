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
import styles from "./article.module.css"; // Import CSS Module

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ArticleViewChart = ({ articles }) => {
  const [numArticles, setNumArticles] = useState(5);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const sortedArticles = [...articles]
      .sort((a, b) => b.visited_count - a.visited_count)
      .slice(0, numArticles);

    setChartData({
      labels: sortedArticles.map(article => article.title),
      datasets: [
        {
          label: 'Views',
          data: sortedArticles.map(article => article.visited_count),
          backgroundColor: 'rgba(230, 166, 16, 0.5)',
        },
      ],
    });
  }, [articles, numArticles]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top Articles by Views' },
    },
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Select Top Articles: </label>
      <select value={numArticles} className={styles.select} onChange={(e) => setNumArticles(Number(e.target.value))}>
        {[5, 10, 15, 20].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <div className={styles.chartContainer}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ArticleViewChart;
