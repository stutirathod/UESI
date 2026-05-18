import React, {useEffect, useContext} from "react";
import styles from "./FeedbackSection.module.css";
import TestimonialCard from "./TestimonialCard";
import { AuthContext } from "../../Utils/AuthContext";

const FeedbackSection = ({ feedbacks, id, name }) => {
  const { user } = useContext(AuthContext);
  
  const capital = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <section className={styles.feedbackSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h2 className={styles.subtitle}>See the Impact of Your Support</h2>
          </header>

          <div className={styles.testimonialGrid}>
            {feedbacks.map((feedback, index) => (
              <TestimonialCard
                key={index}
                user_name={capital(feedback.author.first_name) + ' ' + capital(feedback.author.last_name)}
                rating={feedback.rating}
                content={feedback.content}
                isowner={ user._id === feedback.author._id}
                feedbackId={feedback._id}
                id={id}
                name={name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
