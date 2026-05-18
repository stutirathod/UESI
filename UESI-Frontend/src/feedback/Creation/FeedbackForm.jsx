import React, { useState } from "react";
import { Button } from "./Button";
import styles from "./Feedback.module.css";
import "./rating.css";
import { success, error } from "../../Utils/SmallFunc";

export const FeedbackForm = ({ url }) => {
  const [rating, setRating] = useState(0); // State for storing the rating
  const [content, setAdditionalFeedback] = useState(""); // State for additional feedback

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleFeedbackChange = (e) => {
    setAdditionalFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: Sending the feedback to the server
    const feedback = {
      rating,
      content,
    };

    if(feedback.rating === 0 || feedback.content === ''){
      error("Please provide a rating and additional feedback.");
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({feedback}),
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          success("Feedback submitted successfully!");
          setRating(0); // Reset state
          setAdditionalFeedback(""); // Reset state
        } else {
          throw new Error("Failed to submit feedback.");
        }
      })
      .catch((err) => {
        console.error(err);
        error("Something went wrong while submitting feedback.");
      });
  };

  return (
    <form className={styles.feedbackContainer} onSubmit={handleSubmit}>
      <div className={styles.feedbackHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Feedback</h1>
          <p className={styles.subtitle}>Please rate your experience below</p>
        </div>
        <div className={styles.ratingContainer}>
          <div className={styles.starsWrapper}>
            <fieldset className="starability-heart">
              <input
                type="radio"
                id="no-rate"
                className="input-no-rate"
                name="rating"
                value="0"
                checked={rating === 0}
                onChange={handleRatingChange}
                aria-label="No rating."
              />
              <input
                type="radio"
                id="first-rate1"
                name="rating"
                value="1"
                checked={rating === 1}
                onChange={handleRatingChange}
              />
              <label htmlFor="first-rate1" title="Terrible">
                1 star
              </label>
              <input
                type="radio"
                id="first-rate2"
                name="rating"
                value="2"
                checked={rating === 2}
                onChange={handleRatingChange}
              />
              <label htmlFor="first-rate2" title="Not good">
                2 stars
              </label>
              <input
                type="radio"
                id="first-rate3"
                name="rating"
                value="3"
                checked={rating === 3}
                onChange={handleRatingChange}
              />
              <label htmlFor="first-rate3" title="Average">
                3 stars
              </label>
              <input
                type="radio"
                id="first-rate4"
                name="rating"
                value="4"
                checked={rating === 4}
                onChange={handleRatingChange}
              />
              <label htmlFor="first-rate4" title="Very good">
                4 stars
              </label>
              <input
                type="radio"
                id="first-rate5"
                name="rating"
                value="5"
                checked={rating === 5}
                onChange={handleRatingChange}
              />
              <label htmlFor="first-rate5" title="Amazing">
                5 stars
              </label>
            </fieldset>
          </div>
        </div>
      </div>

      <div className={styles.feedbackInput}>
        <label htmlFor="content" className={styles.inputLabel}>
          Additional feedback
        </label>
        <div className={styles.textareaWrapper}>
          <textarea
            id="content"
            className={styles.textarea}
            value={content}
            onChange={handleFeedbackChange}
            placeholder="Type here..."
          />
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Button variant="primary">Submit feedback</Button>
        <div className={styles.divider}>OR</div>
        <Button
          variant="secondary"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/d5ef04c6dcc451341883060b45fd80447d5453b1ddb360f4743066e96c9d68f9?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
        >
          Home
        </Button>
      </div>
    </form>
  );
};
