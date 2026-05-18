import React, { useContext } from "react";
import styles from "./EventDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext";
import { success, error } from "../../../Utils/SmallFunc";

export function BookingCard({ start_date }) {
  const { id } = useParams();
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      error("Please login to register for the event");
      navigate("/login");
      return;
    }
      const response = await fetch(
        `http://localhost:8080/programs/${id}/registeredUsers`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if(data.message) {
            success(data.message);
          }
          if(data.error) {
            error(data.error);
          }
        })
        .catch((err) => {
          console.error(err);
          error("Failed to fetch programs");
        });
  };

  // Format date and time function
  function formatDateTime(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dayName}, ${monthName} ${day} ${year}, ${time}`;
  }

  return (
    <div className={styles.bookingCard}>
      <form onSubmit={handleSubmit}>
        <div className={styles.dateTimeTitle}>Date & Time</div>
        <div className={styles.dateTimeValue}>{formatDateTime(start_date)}</div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.primaryButton}>
            Register now
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingCard;
