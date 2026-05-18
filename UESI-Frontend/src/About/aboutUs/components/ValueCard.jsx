import React from "react";
import styles from "../AboutUs.module.css";

export const ValueCard = ({ title, description }) => {
  return (
    <div className={styles.valueItem}>
      <h3 className={styles.valueHeading}>{title}</h3>
      <p className={styles.valueText}>{description}</p>
    </div>
  );
};
