import React, { useState, useEffect, useContext } from "react";
import { InputField } from "./InputField";
import styles from "./CourseForm.module.css";
import { success, error } from "../../Utils/SmallFunc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";

export function CourseForm() {
  const navigate = useNavigate();
  const [course, setCourseData] = useState({
    title: "",
    instructor: "",
    description: "",
    image: null,
  });
  const { isLogin, isAdmin } = useContext(AuthContext);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
      error("Please login to create a course.");
      return;
    }
    if (isAdmin === false) {
      navigate("/");
      error("You are not authorized to create a course.");
      return;
    }
  }, [isLogin, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCourseData((prev) => ({ ...prev, [name]: files[0] }));
      setFileName(files[0]?.name || "");
    } else {
      setCourseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in course) {
      if (!course[key] || (typeof course[key] === "string" && course[key].trim() === "")) {
        error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        return;
      }
    }

    const formData = new FormData();
    for (let key in course) {
      formData.append(`course[${key}]`, course[key]);
    }

    try {
      const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create course.");

      success(data.message);
      setCourseData({
        title: "",
        instructor: "",
        description: "",
        image: null,
      });
      setFileName("");
    } catch (err) {
      console.error(err);
      error(err.message);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Create Course</h1>

        <InputField
          label="Course Title"
          id="courseTitle"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />

        <InputField
          label="Instructor Name"
          id="instructorName"
          name="instructor"
          value={course.instructor}
          onChange={handleChange}
          required
        />

        <div className={styles.inputGroup}>
          <label htmlFor="courseImage" className={styles.label}>
            Course Image
          </label>
          <div
            className={styles.imageUpload}
            role="button"
            tabIndex={0}
            onClick={() => document.getElementById("courseImage").click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("courseImage").click();
              }
            }}
          >
            <input
              type="file"
              id="courseImage"
              name="image"
              accept="image/*"
              className={styles["visually-hidden"]}
              onChange={handleChange}
              required
            />
            <span>{fileName || "Click to upload image"}</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="courseDescription" className={styles.label}>
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="description"
            className={styles.descriptionInput}
            value={course.description}
            onChange={handleChange}
            placeholder="Type here..."
            required
          />
        </div>
        <br />

        <button type="submit" className={styles.submitButton}>
          Create Course
        </button>
      </div>
    </form>
  );
}
