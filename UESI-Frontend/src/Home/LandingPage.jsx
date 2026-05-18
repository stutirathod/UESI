import React, { useState, useEffect } from "react";
import { Button } from "../Utils/FormItems/Button/Button";
import { Card } from "./Card";
import { ArticleCard } from "./ArticleCard";
import styles from "./styles/LandingPage.module.css";
import CharityDoughnut from "./CharityDoughnut";
import {Link} from "react-router-dom"

const missionCards = [
  {
    icon: "/icons/mission.svg",
    title: "Our Mission",
    description:
      "UESI seeks to evangelize post-matric students in India, nurture them as disciples of Lord Jesus Christ.",
  },
  {
    icon: "/icons/vision.svg",
    title: "Our Vision",
    description:
      "Transformed students impacting the campuses and the nation as disciples of the lord Jesus Christ",
  },
  {
    icon: "/icons/values.svg",
    title: "Core Values",
    description: "Foundational characteristics and guiding principles",
  },
];

const articles = [
  {
    image: "/images/article1.svg",
    title: "Hunger of Reality",
    link: "/articles/1",
  },
  {
    image: "/images/article2.svg",
    title: "Purpose Driven Life",
    link: "/articles/2",
  },
  {
    image: "/images/article3.svg",
    title: "True Discipleship",
    link: "/articles/3",
  },
];

export const LandingPage = () => {
  const [chairtyData, setCharityData] = useState({
    totalAmount: 0,
    required_amount: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/require-amount")
      .then((res) => res.json())
      .then((data) => {
        setCharityData(data);
        console.log(chairtyData);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={styles.landingPage}>
      <main>
        <section className={styles.hero} aria-label="Hero section">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.highlight}>Transforming</span> Lives
              Together
            </h1>
            <p className={styles.heroDescription}>
              Discover courses, insights, and opportunities to make an impact.
            </p>
            <Link to="/signup"><Button>Register</Button></Link>
            
          </div>
          <img
            src="/images/hero.svg"
            alt="Students learning together"
            className={styles.heroImage}
          />
        </section>

        <section className={styles.mission} aria-labelledby="missionTitle">
          <h2 id="missionTitle" className={styles.sectionTitle}>
            About Us
          </h2>
          <p className={styles.sectionDescription}>
            Our Mission, Vision, and Values
          </p>
          <div className={styles.cardGrid}>
            {missionCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className={styles.programs} aria-labelledby="programsTitle">
          <div className={styles.programsContent}>
            <img
              src="/images/programs.png"
              alt=""
              className={styles.programsImage}
              aria-hidden="true"
            />
            <div className={styles.programsText}>
              <h2 id="programsTitle" className={styles.programsTitle}>
                Programs
              </h2>
              <p className={styles.programsDescription}>
                Embrace on a transformative journey of spiritual growth through
                our thoughtfully curated programs. Each program is designed to
                inspire, guide, and support your spiritual journey.
              </p>
              <br />
              <Button>Learn more</Button>
            </div>
          </div>
        </section>

        <section className={styles.courses} aria-labelledby="coursesTitle">
          <div className={styles.coursesContent}>
            <img
              src="/images/courses.svg"
              alt=""
              className={styles.coursesImage}
              aria-hidden="true"
            />
            <div className={styles.coursesText}>
              <h2 id="coursesTitle" className={styles.coursesTitle}>
                Learn and Grow with our Courses
              </h2>
              <p className={styles.coursesDescription}>
                Join a transformative learning experience with expertly crafted
                courses designed to empower your journey.
              </p>
              <br />
              <Link to="/courses">
              <Button>View courses</Button>
              </Link>
              
            </div>
          </div>
        </section>

        <section className={styles.donation} aria-labelledby="donationTitle">
          <div className={styles.donationContent}>
            <h2 id="donationTitle" className={styles.donationTitle}>
              Make a Donation
            </h2>
            <p className={styles.donationDescription}>
              Your generous gift, even a single gift matters
            </p>
            <CharityDoughnut
              requiredAmount={chairtyData.required_amount}
              receivedAmount={chairtyData.totalAmount} />
              <Link to="/give"><Button>Donate Now</Button></Link>
            
          </div>
        </section>

        <section className={styles.articles} aria-labelledby="articlesTitle">
          <h2 id="articlesTitle" className={styles.articlesTitle}>
            Articles
          </h2>
          <p className={styles.articlesDescription}>
            The UESI blog is the best place to read and learn about the latest
            insights, theology and more.
          </p>
          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>
          <Link to="/articles"><Button>View Articles →</Button></Link>
          
        </section>
      </main>
    </div>
  );
};
