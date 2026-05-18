import React from "react";
import {Link} from "react-router-dom";
import styles from "./Courses.module.css";

export const CourseCard = ({
  image,
  rating,
  title,
  instructor,
  id,
}) => {
  return (
    <div className={styles.courseCard}>
      <img
        loading="lazy"
        src={image}
        alt={`Course thumbnail for ${title}`}
        className={styles.courseImage}
      />
      <div className={styles.ratingContainer}>
        <div className={styles.ratingSymbol} aria-hidden="true"></div>
        <div className={styles.ratingValue}>{rating}</div>
      </div>
      <h3 className={styles.courseTitle}>{title}</h3>
      <div className={styles.cardFooter}>
        <span className={styles.instructorName}>{instructor}</span>
        <Link to={`${id}`} className={styles.enrollButton}>
          <span>Enroll</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/59952475a56311b192614d79190a205b1bb906e39a0b9732863af6b92e78327c?placeholderIfAbsent=true&apiKey=1a66c5ae2cfb4c42b4d1dc7b0a8bbc35"
            alt=""
            className={styles.enrollIcon}
          />
        </Link>
      </div>
    </div>
  );
};
