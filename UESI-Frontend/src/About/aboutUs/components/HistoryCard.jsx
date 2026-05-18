import React from "react";
import styles from "../AboutUs.module.css";

export const HistoryCard = ({ title, content }) => {
  return (
    <div className={styles.historyCard}>
      <h3 className={styles.historyCardTitle}>{title}</h3>
      <div className={styles.historyCardDivider} />
      <p className={styles.historyCardText}>{content}</p>
    </div>
  );
};
