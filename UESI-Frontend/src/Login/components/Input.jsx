import React from "react";
import styles from "./Input.module.css";

export const Input = ({ label, type = "text", placeholder, icon, name, value, onChange  }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          className={styles.input}
          aria-label={label}
          name={name}
          value={value}
          onChange={onChange}
        />
        {icon && (
          <img loading="lazy" src={icon} className={styles.icon} alt="" />
        )}
      </div>
    </div>
  );
};
