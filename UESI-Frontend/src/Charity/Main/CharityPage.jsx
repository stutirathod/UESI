import React, { useState, useContext } from "react";
import styles from "./styles/Landing.module.css";
import { CharityCard } from "./components/CharityCard";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../Utils/AuthContext";
import { error as newerror, success } from "../../Utils/SmallFunc";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51Qf0e801W0osYzmYBfbmYDbvmxlgHHN0yrZftt0BCCMlLEByzGavU1FKrcMNa7uDCjOeFOjaIFD33IGinL8iW0kc00Ii6VEUTW");

const charityPrograms = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/adbfdd43b2b65178d0609aac00a112d042ef865b6526d3b65e790f6e9be0ef7d",
    title: "Children",
    description: "Support children in need and help create a brighter future.",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4284acbf2081be9e6258ac65b1aa2bc001526a35c706dde1a51e009484d53d3",
    title: "Zoo",
    description: "Contribute to wildlife conservation efforts.",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/982a3f58f5ef463a0ed5963d0ba57f8da9e5eb2cea62dd40e141af000d600946",
    title: "Education",
    description: "Help provide education for underprivileged children.",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d1c84c60f813e2a846cf46bd3d94987b7eb0b7dabd7606e1940c32a750acd5a",
    title: "Food",
    description: "Fight hunger and support food distribution programs.",
  },
];

export const CharityPage = () => {
  const { isLogin, isAdmin } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [requireAmount, setRequiredAmount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      newerror("Please login to donate.");
      return navigate("/login");
    }

    if (!amount || isNaN(amount) || amount < 1) {
      setError("Please enter a valid amount of at least ₹1.");
      return;
    }

    setIsProcessing(true);

    try {
      const stripe = await stripePromise;

      const response = await fetch("http://localhost:8080/give", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) * 100 }), // Convert to paise
        credentials: "include",
      });

      const { sessionId, success, message } = await response.json();

      if (success) {
        localStorage.setItem("stripe_session_id", sessionId); // Store session ID for tracking
        await stripe.redirectToCheckout({ sessionId });
      } else {
        setError(message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };


  const handleRequiredAmount = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin || !isAdmin) {
      newerror("Please login to donate.");
      return navigate("/login");
    }

    if (!requireAmount || isNaN(requireAmount) || requireAmount < 500) {
      setError("Please enter a valid amount of at least ₹500.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:8080/require-amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requireAmount: parseFloat(requireAmount) }), // Convert to paise
        credentials: "include",
      });

      const { message } = await response.json();

      if (message) {
        success("Amount set successfully");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  }
  

  return (
    <div className={styles.landingPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.mainHeading}>We're here to help you share</h1>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/541ac7f00630ef02f9335461e4b5fafb572162b3dedbd65329f7a5273454c0be"
              alt="Charity hero"
              className={styles.decorativeImage}
            />
            <div className={styles.ctaContainer}>
              <p className={styles.subHeading}>
                Join us in making the world a better place through your generosity.
              </p>
              <div className={styles.buttonGroup}>
                <button className={styles.primaryButton}>View Programs</button>
                <button className={styles.secondaryButton}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1168febf07d36b2af90e8ebb121995c226a205018e2898ca4c7513c351ed0c5d"
                    alt="Stories"
                    className={styles.buttonIcon}
                  />
                  <span>View Stories</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9930c488d0721d19766f4741a6ab15a66dc1ba72eeeda7b71fdad2f8c1e6dcb6"
              alt="Helping others"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <h2 className={styles.programHeading}>Our Charity Programs</h2>

      <section className={styles.charityPrograms}>
        {charityPrograms.map((program, index) => (
          <CharityCard key={index} {...program} />
        ))}
      </section>

      <section className={styles.donationSection}>
        <h2 className={styles.donationHeading}>Make a Donation</h2>
        <form className={styles.donationForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="donationAmount" className={styles.visuallyHidden}>
              Enter donation amount
            </label>
            <span className={styles.currencySymbol}>&#8377;</span>
            <input
              type="text"
              id="donationAmount"
              className={styles.amountInput}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isProcessing}
          >
            {isProcessing ? <img src="loading-balls.svg" alt="Loading icon" height="64" width="64"/>: "Donate"}
          </button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </section>

      {isAdmin && <section className={styles.donationSection}>
        <h2 className={styles.donationHeading}>Set Required Amount</h2>
        <form className={styles.donationForm} onSubmit={handleRequiredAmount}>
          <div className={styles.inputGroup}>
            <label htmlFor="donationAmount" className={styles.visuallyHidden}>
            Set Required Amount 
            </label>
            <span className={styles.currencySymbol}>  &#8377;</span>
            <input
              type="text"
              id="donationAmount"
              className={styles.amountInput}
              placeholder="Enter amount"
              value={requireAmount}
              onChange={(e) => setRequiredAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isProcessing}
          >
            {isProcessing ? <img src="loading-balls.svg" alt="Loading icon" height="64" width="64"/>: "Donate"}
          </button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </section>}

      <h2 className={styles.testimonialHeading}>
        Over 10,000 people trust us with their donations
      </h2>

      <section className={styles.impactSection}>
        <div className={styles.impactContent}>
          <h2 className={styles.impactHeading}>Every donation makes a difference</h2>
          <p className={styles.testimonialText}>
            "Everything you share makes a real impact. I trust Shareiscare to handle my donations safely and effectively."
          </p>
          <p className={styles.testimonialAuthor}>_ Zack James</p>
        </div>
      </section>
    </div>
  );
};
