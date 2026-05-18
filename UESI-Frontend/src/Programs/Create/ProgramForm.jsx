import React, { useState, useEffect, useContext } from "react";
import styles from "./ProgramForm.module.css";
import { success, error } from "../../Utils/SmallFunc";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Utils/FormItems/Button/Button";
import { AuthContext } from "../../Utils/AuthContext";

export default function ProgramForm() {
  const navigate = useNavigate();
  const [program, setProgram] = useState({
    title: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    status: "Active", // Default value
    image: null, // Image will be handled as a file
  });
  const [fileName, setFileName] = useState("");
  const {isLogin, isAdmin} = useContext(AuthContext);

  useEffect(() => {
    if(!isLogin){
      error("Please login to create a program.");
      navigate("/login");
      return;
    } 
    if(!isAdmin){
      error("You are not authorized to create a program.");
      navigate("/");
      return;
    }
  }, [isLogin, isAdmin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProgram((prev) => ({ ...prev, [name]: files[0] }));
      setFileName(files[0]?.name || "");
    } else {
      setProgram((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    for (let key in program) {
      if (
        !program[key] ||
        (typeof program[key] === "string" && program[key].trim() === "")
      ) {
        error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        return;
      }
    }

    try {
      const formData = new FormData();
      for (let key in program) {
        formData.append(`program[${key}]`, program[key]);
      }

      const response = await fetch("http://localhost:8080/programs", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create program.");
      }

      success("Program created successfully!");
      setProgram({
        title: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
        status: "Active",
        image: null,
      });
      setFileName("");
      navigate("/programs");
    } catch (err) {
      console.error(err);
      error("Something went wrong while creating the program.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit} noValidate>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Create Program</h1>

          <div className={styles.inputGroup}>
            <label htmlFor="programTitle" className={styles.label}>
              Program Title
            </label>
            <input
              id="programTitle"
              type="text"
              name="title"
              className={styles.input}
              value={program.title}
              onChange={handleChange}
              placeholder="Type here"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="programVenue" className={styles.label}>
              Program Venue
            </label>
            <input
              id="programVenue"
              type="text"
              name="location"
              className={styles.input}
              placeholder="Type here"
              value={program.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.dateContainer}>
            <div className={styles.dateGroup}>
              <label htmlFor="start_date" className={styles.label}>
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                className={styles.input}
                value={program.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.dateGroup}>
              <label htmlFor="end_date" className={styles.label}>
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                value={program.end_date}
                className={styles.input}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="status" className={styles.label}>
              Program Status
            </label>
            <select
              name="status"
              className={styles.input}
              value={program.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        <h2 className={styles.title}>Program Description</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="programImage" className={styles.label}>
            Program Image
          </label>
          <div
            className={styles.imageSection}
            role="button"
            tabIndex="0"
            onClick={() => document.getElementById("programImage").click()}
          >
            <input
              type="file"
              id="programImage"
              name="image"
              accept="image/*"
              className={styles["visually-hidden"]}
              onChange={handleChange}
              aria-label="Upload program image"
            />
            <span>{fileName || "Click to upload an image"}</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="programDescription" className={styles.label}>
            Program Description
          </label>
          <textarea
            id="programDescription"
            name="description"
            className={styles.descriptionArea}
            placeholder="Type here..."
            value={program.description}
            onChange={handleChange}
            required
          />
        </div>

        <Button className={styles.submitButton} type="submit">Create New</Button>
      </form>
    </div>
  );
} 