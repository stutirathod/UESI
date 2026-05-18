import * as React from "react";
import styles from "./EditProgramForm.module.css";

function FieldGroup({ label, children, fieldId }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={fieldId} className={styles.visuallyHidden}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default FieldGroup;
