import React from "react";
import styles from "./ProgramsPage.module.css";

export function ProgramTitle({ title }) {
  return (
    <div className={styles.div3}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
