import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { success,error } from '../../Utils/SmallFunc';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message state

    try {
      const response = await fetch("http://localhost:8080/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        success("Password reset link sent to your email.");
      } else {
        error(data.error || "Something went wrong. Try again.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Forgot Password</h1>
        
        <label htmlFor="emailInput" className={styles.label}>Email</label>
        <input
          id="emailInput"
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          aria-label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className={styles.submitButton}>Submit</button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
