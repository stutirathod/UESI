import React, { useState, useEffect, useContext } from "react";
import { EventHero } from "./EventHero";
import { BookingCard } from "./BookingCard";
import { EventDescription } from "./EventDescription";
import { EventLocation } from "./EventLocation";
import styles from "./EventDetails.module.css";
import { useParams } from "react-router-dom";
import { success, error } from "../../../Utils/SmallFunc";
import { FeedbackForm } from "../../../feedback/Creation/FeedbackForm";
import { AuthContext } from "../../../Utils/AuthContext";
import FeedbackSection from "../../../Feedback/Show/FeedbackSection"
import RegistrationChart from "./RegistrationChart";

export function EventDetails() {
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLogin, isAdmin } = useContext(AuthContext);


  useEffect(() => {
    fetch(`http://localhost:8080/programs/${id}`) // Request program data by ID
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch program details");
        return res.json();
      })
      .then((data) => {
        setProgram(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        error(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!program) {
    return <div>Program not found.</div>;
  }
  return (
    <div className={styles.eventContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <EventHero image={program.image.path} />
            <EventDescription
              title={program.title}
              description={program.description}
              start_date={program.start_date}
              end_date={program.end_date}
            />
          </div>
          <div className={styles.rightColumn}>
            <BookingCard start_date={program.start_date} />
            <br />
            <EventLocation location={program.location} geometry={program.geometry} title={program.title}/>
          </div>
        </div>
      </div>
      {program.feedbacks.length > 0 && <FeedbackSection feedbacks={program.feedbacks} id={program._id} name="programs"/>}
      <br />
      {isLogin && !isAdmin && <FeedbackForm url={`http://localhost:8080/programs/${id}/feedbacks`}/>}
      {isAdmin && <RegistrationChart program={program}/>}
    </div>
  );
}
