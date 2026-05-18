import React from "react";
import styles from "./article.module.css";

export const ArticleCard = ({ image, title, description }) => {
  return (
    <article className={styles.card}>
      <img
        loading="lazy"
        src={image}
        alt={title}
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </article>
  );
};
