import React from "react";
import styles from "../styles/Landing.module.css";

export const CharityCard = ({ image, title, description }) => {
  return (
    <div className={styles.charityCard}>
      <img
        loading="lazy"
        src={image}
        alt={`${title} charity program`}
        className={styles.charityImage}
      />
      <div className={styles.charityContent}>
        <h3 className={styles.charityTitle}>{title}</h3>
        <p className={styles.charityDescription}>{description}</p>
        <button className={styles.learnMoreButton}>Learn More</button>
      </div>
    </div>
  );
};
