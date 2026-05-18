import React from "react";
import styles from "./EventDetails.module.css";
import MapComponent from "./MapComponent";

export function EventLocation({ location, geometry, title }) {
  return (
    <div className={styles.locationSection}>
      <h2 className={styles.locationTitle}>Where you'll be</h2>
      <MapComponent geometry={geometry} title={title}/>
      <br />
      <h3 className={styles.venueName}>{location}</h3>
    </div>
  );
}
