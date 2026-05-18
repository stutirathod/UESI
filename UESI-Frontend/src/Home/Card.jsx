import React from "react";
import styles from "./styles/Card.module.css";

export const Card = ({ icon, title, description }) => {
  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        <img src={icon} alt="" className={styles.cardIcon} aria-hidden="true" />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </article>
  );
};
