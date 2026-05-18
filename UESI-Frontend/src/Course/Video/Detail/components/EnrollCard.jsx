import React from "react";
import styles from "../VideoDetails.module.css";

export const EnrollCard = ({ imageUrl }) => {
  return (
    <div className={styles.enrollCard}>
      <img
        loading="lazy"
        src={imageUrl}
        alt="Course enrollment preview"
        className={styles.enrollImage}
      />
      <button className={styles.enrollButton}>ENROLL NOW</button>
    </div>
  );
};
