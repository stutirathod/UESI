import React from "react";
import styles from "./FeedbackSection.module.css";
import StarRating from "./StarRating";
import { Button } from "../../Utils/FormItems/Button/Button";
import { success } from "../../Utils/SmallFunc";
import { useNavigate, useLocation } from "react-router-dom";

const TestimonialCard = ({
  user_name,
  rating,
  content,
  isowner,
  id,
  feedbackId,
  name,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const reload = () => {
    navigate(location.pathname, { replace: true });
  };
  const handleDelete = () => {
    fetch(`http://localhost:8080/${name}/${id}/feedbacks/${feedbackId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        success("Feedback deleted successfully");
        reload();
      })
      .catch((err) => console.error(err));
  };
  return (
    <article className={styles.testimonialCard}>
      <div className={styles.ratingContainer}>
        <StarRating rating={rating} />
      </div>
      <h3 className={styles.testimonialName}>{user_name}</h3>
      <p className={styles.testimonialContent}>{content} </p>
      {isowner && (
        <Button
          variant="delete"
          onClick={handleDelete}
          className={styles.leftalgin}
        >
          Delete
        </Button>
      )}
    </article>
  );
};

export default TestimonialCard;
