import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import PasswordInput from "./PasswordInput";
import { useParams, useNavigate } from "react-router-dom";
import { success } from "../../Utils/SmallFunc";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);

  // Check if the token is valid before showing the form
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`http://localhost:8080/reset/${token}`);
        const data = await response.json();
        console.log(data);

        if (data.valid) {
          setValidToken(true);
        } else {
          setError("Invalid or expired reset link.");
          setValidToken(false);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setValidToken(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "newPassword") setNewPassword(value);
    if (id === "confirmPassword") setConfirmPassword(value);

    console.log(newPassword, confirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword  }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        success("Password updated successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {!validToken ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Reset Password</h1>

          <PasswordInput 
            id="newPassword" 
            label="New Password" 
            value={newPassword} 
            onChange={handleChange} 
          />
          <PasswordInput 
            id="confirmPassword" 
            label="Confirm Password" 
            value={confirmPassword} 
            onChange={handleChange} 
          />

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
