import React from "react";
import styles from "./CourseForm.module.css";

export function InputField({ id, label, type = "text", ...props }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={styles.input}
        aria-label={label}
        {...props}
      />
    </div>
  );
}
