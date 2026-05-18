import React from "react";
import styles from "./ResetPassword.module.css";

const PasswordInput = ({ id, label, value, onChange }) => {
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type="password"
        id={id}
        className={styles.inputField}
        placeholder="Enter your Password"
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default PasswordInput;
