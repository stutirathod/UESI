import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseEditor.module.css";
import { FormField } from "./FormField";
import { success, error } from "../../../Utils/SmallFunc.js";

export function CourseEditor() {
  const { id } = useParams(); // Extract course ID from the route
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    instructor: "",
    description: "",
    image: null,
  });
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch course details on component mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/courses/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch course details.");

        const data = await response.json();
        setCourse({
          title: data.title,
          instructor: data.instructor,
          description: data.description,
          image: data.image.path,
        });
      } catch (err) {
        console.error(err);
        error("Unable to load course details.");
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setCourse((prev) => ({ ...prev, image: files[0] }));
      setFileName(files[0]?.name || "");
    } else {
      setCourse((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate fields
    console.log(course);
    for (let key in course) {
      if (
        typeof course[key] === "string" &&
        course[key].trim() === "" &&
        key !== "image"
      ) {
        error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        setIsSubmitting(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("course[title]", course.title);
    formData.append("course[instructor]", course.instructor);
    formData.append("course[description]", course.description);

    if (course.image instanceof File) {
      formData.append("course[image]", course.image); // Append file separately
    }

    try {
      const response = await fetch(`http://localhost:8080/courses/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update course.");

      const result = await response.json();
      success("Course updated successfully!");
      navigate("/"); // Redirect to the courses list
    } catch (err) {
      console.error(err);
      error("Failed to update course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit Course</h1>

          <form onSubmit={handleSubmit}>
            <FormField
              label="Course Title"
              id="courseTitle"
              name="title"
              placeholder="Type here"
              value={course.title}
              onChange={handleChange}
              required
            />

            <FormField
              label="Instructor Name"
              id="instructorName"
              name="instructor"
              placeholder="Type here"
              value={course.instructor}
              onChange={handleChange}
              required
            />

            {/* <div className={styles.dateGroup}>
              <FormField
                label="Start Date"
                id="startDate"
                name="startDate"
                type="date"
                value={course.startDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="End Date"
                id="endDate"
                name="endDate"
                type="date"
                value={course.endDate}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className={styles.orgImg}>
              <h3>Orignal Image</h3>
              <img src={course.image} alt="" id={styles.orgImage} />
            </div>

            <h2 className={styles.title}>Edit Description</h2>

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label htmlFor="courseDescription" className={styles.label}>
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="description"
                className={styles.textArea}
                placeholder="Type here..."
                value={course.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Edit Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
