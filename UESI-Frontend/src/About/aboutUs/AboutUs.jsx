import React from "react";
import styles from "./AboutUs.module.css";
import { StatCard } from "./components/StatCard";
import { ValueCard } from "./components/ValueCard";
import { HistoryCard } from "./components/HistoryCard";

const stats = [
  { number: "650,000", label: "Total Charity" },
  { number: "+1,000", label: "Feedback" },
  { number: "+20,000", label: "Number of Members" },
];

const values = [
  {
    title: "Relationship with God",
    description:
      "Relationship with God is to have an intimate fellowship with God in all the things we do, say, or think.",
  },
  {
    title: "Centrality of the Word of God",
    description:
      "For UESI, the Word of God shall be the touchstone. It provides the standards and light for life and ministry.",
  },
  {
    title: "Moral Purity & Financial Integrity",
    description:
      "UESI shall maintain high standards of moral and ethical purity in relationships and responsibilities",
  },
  {
    title: "Fellowship",
    description:
      "UESI is ushered in and sustained through fellowship. Caring, sharing, and bearing one another in love for Christ's sake.",
  },
  {
    title: "Personal Care",
    description:
      "Every individual is given importance in UESI and is expected to make his unique contribution to the Kingdom of God",
  },
  {
    title: "Student Initiative",
    description:
      "Students, under the initiation of the Holy Spirit, take the initiative and responsibility of their united witness and outreach.",
  },
];

const history = [
  {
    title: "190 Poonamalle Road, Madras",
    content:"Prof Enoch invited Dr Sterrett to Madras in 1951. He came with the Moody science film, ‘God and Creation’. The film, which was screened in many colleges and helped the seniors to find those who were interested in the things of the Lord. They had a real breakthrough in Stanley Medical College and were meeting regularly on Fridays. Early in 1948 Half a dozen students of CMC, Vellore, without any senior adviser felt the need for a deeper fellowship than what was provided by the existing Christian organization in the College SCM. In 1948, D Jayapaul, moved to Coimbatore from Madras as student for second year and missed the Christian Fellowship in Madras. However, he used to go out into the open field and pray that the Lord would raise up prayer cell in G C T hostel. In answer to prayer, the Lord sent H S Ponnuraj (then a student) from Madras, for his second year, to Coimbatore. His coming to G C T hostel was a great help and due to his dynamic leadership and zeal for witnessing, the Lord raised up a small prayer cell which grew up steadily."

  },
  {
    title: "Humble beginning of Evangelical Unions",
    content:"CMC ICEU In November 1951, Dr Sterrett went to Vellore along with John Moody helped members form an Evangelical Union. The doctrinal basis was discussed, the whole Constitution was drawn up and the name Evangelical Union was accepted. Then the first CMC EU Committee was formed and got official recognition from CMC.Madras ICEU The constant interaction and prayer among students and graduates led to the formation of the committee for Inter Collegiate Evangelical Union (ICEU) of Madras in 1951. A student magazine, entitled The Evangelical Student Coimbatore ICEU D Jayapaul and H S Ponnuraj did lot of outreach in the nearby colleges including the Agricultural College adding students to the prayer cell. Later, in 1952 with H S Ponnuraj’s initiative, the Coimbatore ICEU was officially formed."
  },
  {
    title: "Formation of UESI",
    content:
      "Now three groups with similar aims and objectives are meeting at three different places. They felt that the three groups should be united. The three groups had a burden and vision not only for their own places but also for the other students in India. UESI name was given to distinguish it from other students movements in India and to underline the indigenous origin of the movement. The ministry of UESI has now spread all the states of our vast and diverse nation, transforming thousands of students and graduates to serve as salt and light for God’s glory"
  },
];

export const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.missionText}>
          UESI seeks to evangelize post-matric students in India, nurture them
          as disciples of the Lord Jesus Christ, that they may serve the Church
          and the society.
        </p>

        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Our Success Numbers</h2>
          <div className={styles.statsWrapper}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <div className={styles.divider} />}
                  <StatCard number={stat.number} label={stat.label} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.visionSection}>
          <h2 className={styles.visionTitle}>Our Vision</h2>
          <p className={styles.visionText}>
            Transformed students impacting the campuses and the nation as
            disciples of The Lord Jesus Christ.
          </p>
        </section>

        <h2 className={styles.valuesTitle}>Core Values of UESI</h2>
        <div className={styles.valueGrid}>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>

        <section className={styles.historySection}>
          <h2 className={styles.historyTitle}>Our story starts in 1948</h2>
          <div className={styles.historyGrid}>
            {history.map((item, index) => (
              <HistoryCard
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
