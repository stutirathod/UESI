import React, { useContext } from "react";
import styles from "./EventDetails.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../Utils/FormItems/Button/Button";
import { AuthContext } from "../../../Utils/AuthContext";
import { success } from "../../../Utils/SmallFunc";


export function EventDescription({
  title,
  description,
  start_date,
  end_date,
}) {
  const { isAdmin } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    fetch(`http://localhost:8080/programs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({ id }),
    })
      .then(() => {
        success("Program Deleted Succesfully");
        navigate("/programs");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.descriptionSection}>
      <div className={styles.eventInfo}>
        {isAdmin && (
          <div className={styles.metaInfo}>
            <Link to={`/programs/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="delete" onClick={handleDelete} className={styles.leftalgin}>
              Delete
            </Button>
          </div>
        )}
        <h1 className={styles.eventTitle}>{title}</h1>
      </div>
      <h2 className={styles.sectionTitle}>Description</h2>
      <p className={styles.descriptionText}>{description}</p>
      <div className={styles.hoursSection}>
        <h2 className={styles.sectionTitle}>Hours</h2>
        <div className={styles.hoursGrid}>
          <div>
            <p>Start Date</p>
            <p>End Date:</p>
          </div>
          <div>
            <p>
              {new Date(start_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              {new Date(end_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
