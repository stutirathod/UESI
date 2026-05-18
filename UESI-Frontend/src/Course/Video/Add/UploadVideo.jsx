import React, { useState } from "react";
import styles from "./UploadVideo.module.css";
import { success, error as showErr } from "../../../Utils/SmallFunc";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UploadVideo() {
  const navigate = useNavigate(); 
  const [url, setUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get Course ID from URL

  // Handle File Selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setUrl(file);
      setFileName(file.name);
    } else {
      showErr("Please upload a valid video file.");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !url) {
      showErr("All fields are required.");
      return;
    }

    setLoading(true);
    console.log(url);
    const formData = new FormData();
    formData.append("video", url); // ✅ Correct field name for backend
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch(`http://localhost:8080/courses/${id}/videos`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        success("Video uploaded successfully!");
        setTitle("");
        setDescription("");
        setUrl(null);
        setFileName("");
        navigate(`/courses/${id}`);
      } else {
        showErr(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      showErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Upload Video</h1>
        </header>

        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <div className={styles.formGroup}>
            <label htmlFor="videoTitle" className={styles.label}>
              Video Title
            </label>
            <input
              type="text"
              id="videoTitle"
              className={styles.input}
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="videoUpload" className={styles.label}>
              Upload Video
            </label>
            <div
              className={styles.videoUploadArea}
              role="button"
              tabIndex="0"
              onClick={() => document.getElementById("videoUpload").click()}
              aria-label="Click to upload video"
            >
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                className={styles.visuallyHidden}
                onChange={handleVideoChange}
                required
              />
              {url ? (
                <p className={styles.fileName}>📁 {fileName}</p>
              ) : (
                <span className={styles.uploadText}>Click to upload video</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="videoDescription" className={styles.label}>
              Video Description
            </label>
            <textarea
              id="videoDescription"
              className={styles.textarea}
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}
