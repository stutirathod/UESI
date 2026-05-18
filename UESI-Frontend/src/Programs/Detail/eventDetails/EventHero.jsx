import React from "react";
import styles from "./EventDetails.module.css";

export function EventHero({image}) {
  return (
    <div className={styles.heroSection}>
      <img
        loading="lazy"
        src={image}
        className={styles.heroBackground}
        alt="Event background"
      />
    </div>
  );
}
