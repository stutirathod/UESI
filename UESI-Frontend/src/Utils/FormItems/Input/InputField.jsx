import React from "react";
import styles from "./InputField.module.css";

export function InputField({ label, id, name, type = "text", ...props }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} type={type} className={styles.inputField} {...props} name={name}/>
    </div>
  );
}
