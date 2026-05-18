import React from "react";
import styles from "../VideoDetails.module.css";

export const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`${styles.tab} ${
        isActive ? styles.tabActive : styles.tabInactive
      }`}
      onClick={onClick}
      tabIndex={0}
      role="tab"
      aria-selected={isActive}
    >
      {label}
    </button>
  );
};
