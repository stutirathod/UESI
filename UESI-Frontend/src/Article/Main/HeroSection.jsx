import React from "react";
import styles from "./article.module.css";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextColumn}>
            <div className={styles.heroTextContent}>
              <h1 className={styles.heroTitle}>
                The latest articles to help you grow in Word of God.
              </h1>
              <p className={styles.heroDescription}>
              Where I take the time to slow down, quite my heart, and look and listen and reflect on the awe inspiring beauty of God’s presents in the world around us.
              </p>
            </div>
          </div>
          <div className={styles.heroImageColumn}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bc3bdae7c448366af302fbb4d650882899cc6d14b4ea54d3022375e44dec57b?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
              alt="Hero section illustration"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
