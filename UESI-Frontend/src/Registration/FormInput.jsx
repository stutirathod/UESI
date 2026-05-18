import React from "react";
import styles from "./SignupForm.module.css";

const FormInput = ({ id, label, type, placeholder }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
};

export default FormInput;
