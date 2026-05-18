import React from "react";
import styles from "./ProgramsPage.module.css";

export function ProgramHeader({image}) {
  return (
    <div className={styles.div}>
      <img
        loading="lazy"
        src={image||"https://cdn.builder.io/api/v1/image/assets/TEMP/f437cf1c033fae9bc47d4b50b9ab32016c18424c8317f2b725369964fc6c5260?placeholderIfAbsent=true&apiKey=1a66c5ae2cfb4c42b4d1dc7b0a8bbc35"}
        className={styles.img}
        alt="Program background"
        style={{ borderRadius: "10px" }}
      />
      for those who need
    </div>
  );
}
