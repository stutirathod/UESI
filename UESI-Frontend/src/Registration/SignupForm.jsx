import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { error, success } from "../Utils/SmallFunc"; // Assuming these functions are available for notifications.

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: 0,
    username: "",
    first_name: "",
    last_name: "",
    address: "",
    gender: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    for (let key in formData) {
      if (formData[key].trim() === "" || formData[key].trim() === 0) {
        error(`${key} is required.`);
        return;
      }
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      error("Passwords do not match.");
      return;
    }

    if (formData.phone_number.length > 10 || formData.phone_number.length < 10){
      error("Phone must be at least 10 characters");
      return;
    }

    // Submit data
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          success("Signup successful!");
          setFormData({
            email: "",
            phone_number: 0,
            username: "",
            first_name: "",
            last_name: "",
            address: "",
            gender: "",
            pincode: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        } else {
          throw new Error("Signup failed.");
        }
      })
      .catch((err) => {
        console.error(err);
        // error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign up to UESI</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone_number" className={styles.label}>
            Phone number
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            className={styles.input}
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={styles.input}
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className={styles.twoColumnGroup}>
          <div className={styles.columnItem}>
            <label htmlFor="first_name" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className={styles.input}
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={styles.columnItem}>
            <label htmlFor="last_name" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className={styles.input}
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={styles.input}
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pincode" className={styles.label}>
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className={styles.input}
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={styles.input}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>

        <div className={styles.loginPrompt}>
          <span className={styles.loginText}>Already have an account? </span>
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
