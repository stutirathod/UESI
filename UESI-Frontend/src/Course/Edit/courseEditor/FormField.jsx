import React from "react";
import styles from "./CourseEditor.module.css";

export function FormField({ label, id, type = "text", ...props }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input type={type} id={id} className={styles.input} {...props} />
    </div>
  );
}
