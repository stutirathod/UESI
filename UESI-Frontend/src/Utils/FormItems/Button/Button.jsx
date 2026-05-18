import React from "react";
import styles from "./Button.module.css";

export const Button = ({
  children,
  variant = "primary",
  onClick,
  className,
  type = "button"
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ""}`}
      onClick={onClick}
      type={type}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
