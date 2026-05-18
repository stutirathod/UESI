import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditProgramForm.module.css";
import FieldGroup from "./FieldGroup";
import { success, error } from "../../../Utils/SmallFunc.js";
import { AuthContext } from "../../../Utils/AuthContext.jsx";

function EditProgramForm() {
  const { id } = useParams(); // Extract program ID from the route
  const navigate = useNavigate();
  const [program, setProgram] = useState({
    title: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    status: "Active",
    image: null,
  });
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLogin, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogin) {
      error("You are not logged in. Please log in to edit a program.");
      return navigate("/login");
    }
    if (!isAdmin) {
      error("You do not have permission to edit a program.");
      return navigate("/");
    }
  }, [isLogin, isAdmin]);

  useEffect(() => {
    // Fetch program details for editing
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/programs/${id}/edit`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch program details.");
        const data = await response.json();
        console.log(data.program);

        // Convert the dates to YYYY-MM-DD format
        const formatDate = (date) => {
          const d = new Date(date);
          return d.toISOString().split("T")[0]; // Extracts only the date part
        };

        setProgram({
          title: data.program.title,
          location: data.program.location,
          start_date: formatDate(data.program.start_date),
          end_date: formatDate(data.program.end_date),
          description: data.program.description,
          status: data.status,
          image: data.orignalImageUrl,
        });
      } catch (err) {
        console.error(err);
        error("Unable to load program details.");
      }
    };

    fetchProgramDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setProgram((prevProgram) => ({
        ...prevProgram,
        image: files[0], // Store file object for upload
      }));
      setFileName(files[0].name);
    } else {
      setProgram((prevProgram) => ({ ...prevProgram, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("program[title]", program.title);
    formData.append("program[location]", program.location);
    formData.append("program[start_date]", program.start_date);
    formData.append("program[end_date]", program.end_date);
    formData.append("program[description]", program.description);
    formData.append("program[status]", program.status);
    if (program.image) {
      formData.append("program[image]", program.image);
    }

    try {
      const response = await fetch(`http://localhost:8080/programs/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update program.");
      success("Program updated successfully!");
      navigate("/programs");
    } catch (err) {
      console.error(err);
      error("Failed to update program.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.programCreateForm} onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Edit Program</div>
          <FieldGroup label="Program Title" fieldId="programTitle">
            <input
              id="programTitle"
              name="title"
              className={styles.inputField}
              type="text"
              placeholder="Type here"
              aria-label="Program Title"
              value={program.title}
              onChange={handleChange}
              required
            />
          </FieldGroup>
          <FieldGroup label="Program Venue" fieldId="programVenue">
            <input
              id="programVenue"
              name="location"
              className={styles.venueField}
              type="text"
              placeholder="Type here"
              aria-label="Program Venue"
              value={program.location}
              onChange={handleChange}
              required
            />
          </FieldGroup>
          <div className={styles.dateGroup}>
            <div className={styles.dateFieldGroup}>
              <label htmlFor="start_date">Start date</label>
              <input
                id="start_date"
                name="start_date"
                className={styles.inputDateField}
                type="date"
                aria-label="Start Date"
                value={program.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className={styles.dateFieldGroup}>
              <label htmlFor="end_date">End date</label>
              <input
                id="end_date"
                name="end_date"
                className={styles.inputDateField}
                type="date"
                aria-label="End Date"
                value={program.end_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <FieldGroup>
            <div className={styles.inputGroup}>
              <label htmlFor="status" className={styles.label}>
                Program Status
              </label>
              <select
                name="status"
                className={styles.inputstatus}
                value={program.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </FieldGroup>
        </div>
        <div className={styles.descriptionTitle}>Edit Program Description</div>
        <div className={styles.descriptionContent}>
          <div className={styles.imageGroup}>
            

            <div className={styles.orgImg}>
              <h3>Orignal Image</h3>
            
              <img src={program.image} alt="" id={styles.orgImage}/>
            </div>

            <div className={styles.descriptionText}>Edit Program Image</div>
            <div
              className={styles.imageContainer}
              onClick={() => document.getElementById("programImage").click()}
            >
              <input
                type="file"
                id="programImage"
                name="image"
                accept="image/*"
                className={styles["visually-hidden"]}
                onChange={handleChange}
              />
              <span>{fileName || "Click to upload an image"}</span>
            </div>
          </div>
          <div className={styles.descriptionGroup}>
            <div className={styles.descriptionText}>
              Edit Program Description
            </div>
            <textarea
              name="description"
              className={styles.textareaField}
              placeholder="Type here..."
              aria-label="Program Description"
              value={program.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <br /><br />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Edit Program"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProgramForm;
