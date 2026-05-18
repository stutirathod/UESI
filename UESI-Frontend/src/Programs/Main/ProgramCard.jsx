import React from "react";
import styles from "./Programs.module.css";


export const ProgramCard = ({ image, name, start_date, isFree = false, end_date, location }) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <img
          loading="lazy"
          src={image}
          alt={`${name} event cover`}
          className={styles.eventImage}
        />
        {isFree && <div className={styles.freeTag}>FREE</div>}
      </div>
      <h3 className={styles.eventTitle}>{name}</h3>
      <time className={styles.eventDate}>{new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}</time>
      <div className={styles.eventLocation}>{location}</div>
      
    </div>
  );
};
