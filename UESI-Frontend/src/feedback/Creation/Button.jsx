import React from "react";
import styles from "./Feedback.module.css";

export const Button = ({ children, variant = "primary", icon, onClick }) => {
  const buttonClass =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;

  return (
    <button className={buttonClass} onClick={onClick}>
      {icon && <img src={icon} alt="" className={styles.buttonIcon} />}
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};
