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
import styles from "./Courses.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CourseViewChart = ({ courses }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [numCourses, setNumCourses] = useState(5); // Default to top 5 courses

  useEffect(() => {
    if (!courses || courses.length === 0) return;

    const sortedCourses = [...courses]
      .sort((a, b) => b.view_count - a.view_count)
      .slice(0, numCourses);

    const labels = sortedCourses.map((course) => course.title);
    const data = sortedCourses.map((course) => course.view_count);

    setChartData({
      labels,
      datasets: [
        {
          label: 'View Count',
          data,
          backgroundColor: 'rgba(255, 164, 99, 0.6)',
        },
      ],
    });
  }, [courses, numCourses]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Top ${numCourses} Courses by View Count` },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.selectContainer}>
        <label>Select Top Courses: </label>
        <select value={numCourses} onChange={(e) => setNumCourses(Number(e.target.value))}>
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

export default CourseViewChart;
