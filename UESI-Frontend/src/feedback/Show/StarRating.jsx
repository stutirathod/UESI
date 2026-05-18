"use client";
import React from "react";
import styles from "./FeedbackSection.module.css";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  const renderStar = (type) => {
    const starTypes = {
      full: (
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_584_371)">
            <path
              d="M16.5879 23.7649L24.8497 28.7514L22.6573 19.3533L29.9565 13.0299L20.3445 12.2144L16.5879 3.35107L12.8314 12.2144L3.21936 13.0299L10.5186 19.3533L8.32616 28.7514L16.5879 23.7649Z"
              fill="#A66E00"
            />
          </g>
          <defs>
            <clipPath id="clip0_584_371">
              <rect
                width="32.0846"
                height="32.0846"
                fill="white"
                transform="translate(0.545654 0.677246)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      half: (
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_584_380)">
            <path
              d="M30.2527 13.0299L20.6407 12.2011L16.8841 3.35107L13.1275 12.2144L3.5155 13.0299L10.8147 19.3533L8.6223 28.7514L16.8841 23.7649L25.1459 28.7514L22.9668 19.3533L30.2527 13.0299ZM16.8841 21.265V8.83219L19.1701 14.2331L25.0255 14.7411L20.5872 18.5913L21.924 24.313L16.8841 21.265Z"
              fill="#A66E00"
            />
          </g>
          <defs>
            <clipPath id="clip0_584_380">
              <rect
                width="32.0846"
                height="32.0846"
                fill="white"
                transform="translate(0.841797 0.677246)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      empty: (
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_584_383)">
            <path
              d="M29.6847 13.0299L20.0727 12.2011L16.3161 3.35107L12.5595 12.2144L2.94751 13.0299L10.2468 19.3533L8.05431 28.7514L16.3161 23.7649L24.5779 28.7514L22.3988 19.3533L29.6847 13.0299ZM16.3161 21.265L11.2895 24.2996L12.6264 18.5779L8.18799 14.7277L14.0434 14.2197L16.3161 8.83219L18.6021 14.2331L24.4576 14.7411L20.0192 18.5913L21.356 24.313L16.3161 21.265Z"
              fill="#A66E00"
            />
          </g>
          <defs>
            <clipPath id="clip0_584_383">
              <rect
                width="32.0846"
                height="32.0846"
                fill="white"
                transform="translate(0.273804 0.677246)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    };

    return starTypes[type];
  };

  return (
    <div className={styles.starRating}>
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className={styles.star}>
          {renderStar("full")}
        </span>
      ))}
      {hasHalfStar && <span className={styles.star}>{renderStar("half")}</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className={styles.star}>
          {renderStar("empty")}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
