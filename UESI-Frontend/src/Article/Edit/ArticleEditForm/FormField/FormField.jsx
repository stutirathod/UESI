import React from "react";
import styles from "./FormField.module.css";

function FormField({ label, inputType, inputClass, value, onChange, placeholder, name}) {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>{label}</label>
      {inputType === "textarea" ? (
        <textarea className={`${inputClass} ${styles.textarea}`} value={value} onChange={onChange} placeholder={placeholder} name={name}/>
      ) : (
        <input type={inputType} className={`${inputClass} ${styles.input}`} value={value} onChange={onChange} placeholder={placeholder} name={name}/>
      )}
    </div>
  );
}

export default FormField;
