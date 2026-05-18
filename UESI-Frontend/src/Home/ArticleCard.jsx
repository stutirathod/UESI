import React from "react";
import styles from "./styles/ArticleCard.module.css";

export const ArticleCard = ({ image, title, link }) => {
  return (
    <article className={styles.articleCard}>
      <a href={link} className={styles.articleLink}>
        <img src={image} alt="" className={styles.articleImage} />
        <div className={styles.articleContent}>
          <h3 className={styles.articleTitle}>{title}</h3>
          <div className={styles.readMore}>
            <span>Read more</span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};
