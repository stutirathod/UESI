import React, { useState, useEffect, useContext } from "react";
import { CourseCard } from "./CourseCard";
import styles from "./Courses.module.css";
import { success, error } from "../../../Utils/SmallFunc";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext";
import CourseViewChart from "./CourseViewChart ";
import { Button } from "../../../Utils/FormItems/Button/Button";
import * as XLSX from "xlsx";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useContext(AuthContext);

  const Image =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/eacc7666a584af30e0fc30a19190ce8e3a433ee4be8b5b8a758c3a4d16932002?placeholderIfAbsent=true&apiKey=1a66c5ae2cfb4c42b4d1dc7b0a8bbc35";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data);
        setCourses(data); // Assuming API returns an array
      } catch (err) {
        error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const generateCourseExcel = () => {
    if (!courses || courses.length === 0) {
      alert("No courses available to generate a report.");
      return;
    }

    // Convert courses to worksheet format
    const data = courses.map((course, index) => ({
      "Sr No": index + 1,
      "Course Title": course.title,
      "Instructor": course.instructor || "N/A",
      Description: course.description || "N/A",
      "Published Date": course.published_date
        ? new Date(course.published_date).toLocaleDateString()
        : "N/A",
      "Total Enrolled Users": course.enrollerd_users?.length || 0,
      "Total Feedbacks": course.feedbacks?.length || 0,
      "Total Videos": course.videos?.length || 0,
      "View Count": course.view_count || 0,
      "Image URL": course.image?.path || "N/A",
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses Report");

    // Generate and trigger file download
    XLSX.writeFile(workbook, "Courses_Report.xlsx");
  };

  return (
    <div className={styles.coursesContainer}>
      <header className={styles.courseHeader}>
        <h1 className={styles.headerTitle}>ALL Courses</h1>
      </header>
      <section className={styles.courseSection}>
        <div className={styles.sectionContent}>
          <div className={styles.titleGroup}>
            <h2 className={styles.mainTitle}>
              
              <p>Course student can join with us.</p>

              {isAdmin && (
                <div style={{ gap: "2rem", display: "flex", justifyContent: "center" }}>
                  <Link to={`/courses/new`} className={styles.newForm}>
                    <Button variant="primary" size="small">
                      Create New
                    </Button>
                  </Link>
                  <Button variant="secondary" onClick={generateCourseExcel}>
                    Generate Report
                  </Button>
                </div>
              )}
            </h2>
          </div>
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <div className={styles.courseGrid}>
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  image={course.image.path || Image}
                  title={course.title}
                  instructor={course.instructor}
                  id={course._id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <br />
      <hr />
      <br />
      {isAdmin && <CourseViewChart courses={courses} />}
    </div>
  );
};
