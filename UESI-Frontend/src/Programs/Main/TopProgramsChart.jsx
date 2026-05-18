import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import styles from "./Programs.module.css";

const TopProgramsChart = () => {
  const [programs, setPrograms] = useState([]);
  const [numPrograms, setNumPrograms] = useState(5); // Default top 5 programs
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch programs from backend
  useEffect(() => {
    fetch("http://localhost:8080/programs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Programs:", data);
        setPrograms(data.allProgram || []);
      })
      .catch((err) => {
        console.error("Failed to fetch programs:", err);
      });
  }, []);

  // Update chart when programs or numPrograms changes
  useEffect(() => {
    if (programs.length === 0) return;

    const sortedPrograms = programs
      .map((program) => ({
        name: program.title, // Ensure `title` is the correct key
        registrations: program.registeredUsers?.length || 0, // Ensure valid count
      }))
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, numPrograms); // Select top X programs

    const labels = sortedPrograms.map((program) => program.name);
    const data = sortedPrograms.map((program) => program.registrations);

    setChartData({
      labels,
      datasets: [
        {
          label: "Registered Users",
          data,
          backgroundColor: "rgba(235, 174, 53, 0.5)",
        },
      ],
    });
  }, [programs, numPrograms]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom size
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Top ${numPrograms} Programs by Registrations`,
        font: { size: 20 },
      },
    },
  };

  return (
    <div
      style={
        (numPrograms === 5 && { width: "800px", height: "550px", margin: "auto" }) ||
        (numPrograms === 10 && { width: "950px", height: "550px", margin: "auto" }) ||
        (numPrograms === 15 && { width: "1100px", height: "550px", margin: "auto" }) ||
        (numPrograms === 20 && { width: "1250px", height: "550px", margin: "auto" }) || {
          width: "800px",
          height: "550px", margin: "auto"
        }
      }
    >
      {/* Dropdown for selecting number of programs */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <label>Select Top Programs: </label>
        <select
          value={numPrograms}
          className={styles.selectContainer}
          onChange={(e) => setNumPrograms(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <Bar options={options} data={chartData} />
    </div>
  );
};

export default TopProgramsChart;
