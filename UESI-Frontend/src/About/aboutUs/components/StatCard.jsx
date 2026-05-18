import React from "react";
import styles from "../AboutUs.module.css";

export const StatCard = ({ number, label }) => {
  return (
    <div className={styles.statItem}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};
