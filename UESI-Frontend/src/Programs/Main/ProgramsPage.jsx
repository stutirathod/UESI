import React, { useEffect, useState, useContext } from "react";
import styles from "./Programs.module.css";
import { Link } from "react-router-dom";
import { error } from "../../Utils/SmallFunc";
import { ProgramCard } from "./ProgramCard";
import { Button } from "../../Utils/FormItems/Button/Button";
import { AuthContext } from "../../Utils/AuthContext";
import TopProgramsChart from "./TopProgramsChart";
import * as XLSX from "xlsx";

export const ProgramsPage = () => {
  const [programsData, setProgramsData] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  // Fetch programs
  useEffect(() => {
    fetch("http://localhost:8080/programs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProgramsData(data.allProgram); // Set all programs
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch programs"); // Use alert if error() is undefined
      });
  }, []);

  // Function to generate Excel report
  const generateProgramExcel = () => {
    if (!programsData || programsData.length === 0) {
      alert("No programs available to generate a report.");
      return;
    }
  
    // Convert programs to worksheet format
    const data = programsData.map((program, index) => {
      // Calculate Average Rating
      const totalRatings = program.feedbacks?.reduce((sum, feedback) => sum + feedback.rating, 0) || 0;
      const avgRating = program.feedbacks?.length ? (totalRatings / program.feedbacks.length).toFixed(1) : "N/A";
  
      return {
        "Sr No": index + 1,
        "Program Title": program.title,
        Description: program.description || "N/A",
        "Start Date": program.start_date ? new Date(program.start_date).toLocaleDateString() : "N/A",
        "End Date": program.end_date ? new Date(program.end_date).toLocaleDateString() : "N/A",
        Location: program.location || "N/A",
        Status: program.status || "N/A",
        "Total Registered Users": program.registeredUsers ? program.registeredUsers.length : 0,
        "Total Feedbacks": program.feedbacks ? program.feedbacks.length : 0,
        "Average Feedback Rating": avgRating, // ⭐ New Field
      };
    });
  
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Programs Report");
  
    // Generate and trigger file download
    XLSX.writeFile(workbook, "Programs_Report.xlsx");
  };
  

  return (
    <div className={styles.programsPage}>
      <div className={styles.hero}>
        <p className={styles.heroText}>
          Celebrate faith, hope, and love as we unite in worship and grow in
          God’s grace.
        </p>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/010edb57065100a0adab8ce754c6c24ff9c1cba923f3946b2d95fe07b6bfdd05?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
          alt="Programs hero banner"
          className={styles.heroImage}
        />
      </div>
      <br /> <br />

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.headerUpcoming}>All</span>
          <span className={styles.headerPrograms}>Programs</span>
          {isAdmin && (
            <Link to="/programs/new">
              <Button variant="primary">Create New</Button>
            </Link>
          )}
          {
            isAdmin && (
                <Button variant="secondary" onClick={generateProgramExcel}>Download Report</Button>
            )
          }
        </div>

        {/* Program Cards */}
        <div className={styles.upcomingEvents}>
          {programsData.map((program) => (
            <Link to={`/programs/${program._id}`} className={styles.link}>
              <ProgramCard
                key={program._id}
                name={program.title}
                image={program.image.path}
                start_date={program.start_date}
                end_date={program.end_date}
                location={program.location}
              />
            </Link>
          ))}
        </div>
        <br />
        <hr />
        <br />

        {isAdmin && (
          <div className={styles.adminControls}>
            <TopProgramsChart />
          </div>
        )}
      </div>
    </div>
  );
};
