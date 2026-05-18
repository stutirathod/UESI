import React, { useState, useEffect, useContext } from "react";
import { TabButton } from "./components/TabButton";
import styles from "./VideoDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext";
import { Button } from "../../../Utils/FormItems/Button/Button";
import { success } from "../../../Utils/SmallFunc";

const tabs = [{ id: "overview", label: "Overview" }];

export const VideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, videoId } = useParams();
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/${id}/videos/${videoId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch video details");
        }
        return response.json();
      })
      .then((data) => {
        setVideo(data);
        console.log(video);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handledelete = () => {
    fetch(`http://localhost:8080/courses/${id}/videos/${videoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        success("Video deleted successfully");
        navigate(`/courses/${id}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to delete video");
      });
  }

  if (loading) return <p>Loading video details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.courseContainer}>
      <div className={styles.heroSection}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>{video?.title}</h1>
        </div>
      </div>
      

      <main className={styles.mainContent}>
      {isAdmin && (
          <Button variant="delete" onClick={handledelete}>
            Delete
          </Button>
        )}
        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <iframe
              width="100%"
              height="700"
              src={video?.url}
              title={video?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className={styles.rating}>
          <span
            className={styles.ratingScore}
            aria-label={`Course rating ${video?.rating || "N/A"} out of 5`}
          >
            ({video?.rating || "N/A"})
          </span>
        </div>

        <h2 className={styles.courseTitle}>{video?.title}</h2>

        <h3 className={styles.sectionTitle}>Course Description</h3>
        <p className={styles.courseDescription}>{video?.description}</p>
      </main>
    </div>
  );
};
