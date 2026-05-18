import React from "react";
import styles from "./article.module.css";

export const NewsletterSection = () => {
  return (
    <section className={styles.newsletterPopup}>
      <div className={styles.newsletterContainer}>
        <div className={styles.newsletterImageColumn}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cec10495132b3495b647c9be6af2b797436d9542a90255464eb6e1fa72582c0?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
            alt="Newsletter subscription visual"
            className={styles.newsletterImage}
          />
        </div>
        <div className={styles.newsletterContentColumn}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Subscribe to our Article</h2>
            <p className={styles.newsletterDescription}>
              The UESI blog is the best place to read and learn about the latest
              insights, theology and more. Read about how our community helps to
              learn and understand the word of God and theological topics.
            </p>
            <form className={styles.newsletterForm}>
              <label htmlFor="email" className={styles.newsletterLabel}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={styles.newsletterInput}
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
