import React, { useState, useEffect, useContext } from "react";
import styles from "./ProgramsPage.module.css";
import { ProgramHeader } from "./ProgramHeader";
import { ProgramTitle } from "./ProgramTitle";
import { EventCard } from "./EventCard";
import { success, error as showError } from "../../Utils/SmallFunc";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";
import { Button } from "../../Utils/FormItems/Button/Button";
import { FeedbackForm } from "../../feedback/Creation/FeedbackForm";
import FeedbackSection from "../../Feedback/Show/FeedbackSection";
import VideoViewChart from "./VideoViewChart";

export function CoursesPage() {
  const { id } = useParams();
  const { isLogin, isAdmin } = useContext(AuthContext);

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setVideos(Array.isArray(data.videos) ? data.videos : []);
        setLoading(false);
      })
      .catch((err) => {
        showError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handledelete = () =>{
      fetch(`http://localhost:8080/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ id }),
      })
      .then(() => {
        success("Course deteled succesfully");
        navigate("/courses");
      })
      .catch((err) => {
        console.error(err)
        error("Unable to delete article")
      })
    }

  if (loading) return <div>Loading courses...</div>;

  if (courses.length === 0) {
    return <div>No courses available.</div>;
  }

  return (
    <div className={styles.programsPage}>
      <ProgramHeader image={courses.image.path} />

      {isAdmin && (
        <div className={styles.metaInfo}>
          <Link to={`/courses/${id}/edit`}>
            <Button variant="primary">Edit</Button>
          </Link>
          <Link to={`/courses/${id}/video/new`}>
            <Button variant="primary">Upload Video</Button>
          </Link>
          <Button variant="delete" onClick={handledelete}>Delete</Button>
        </div>
      )}

      <ProgramTitle title={courses.title} />
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={video._id} className={styles.videoContainer}>
            <Link
              to={`/courses/${id}/videos/${video._id}`}
              style={{ textDecoration: "none" }}
            >
              <EventCard
                key={video._id}
                title={video.title}
                description={video.description}
                isSecondary={index > 0}
                url={video.url}
              ></EventCard>
            </Link>
          </div>
        ))
      ) : (
        <div>No videos available.</div>
      )}
      {courses.feedbacks.length > 0 && (
        <FeedbackSection feedbacks={courses.feedbacks} id={courses._id} name="courses"/>
      )}
      {isLogin && !isAdmin && (
        <FeedbackForm url={`http://localhost:8080/courses/${id}/feedbacks`}/>
      )}
      {isAdmin && <VideoViewChart videos={courses.videos} />}
    </div>
  );
}
