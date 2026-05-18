import React, { useState, useContext } from "react";
import styles from "./LoginPage.module.css";
import { Input } from "./components/Input";
import { success, error } from "../Utils/SmallFunc";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const { setIsLogin, setIsAdmin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key].trim() === "") {
        error(`${key} is required.`);
        return;
      }
    }
    
    // Simulate login API call
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        success(data.message);
        navigate("/");
        setIsLogin(true);
        if(data.user.isAdmin){
          setIsAdmin(true);
        }
      } else {
        error(data.error);
      }
    } catch (err) {
      console.error(err);
      error("Incorrect Credentials");
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formColumn}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h3 className={styles.welcomeText}>Welcome!</h3>
            <h1 className={styles.title}>Sign in to UESI</h1>

            <Input
              label="User name"
              placeholder="Enter your User name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <br />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className={styles.optionsRow}>
              <div className={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="remember"
                  className={styles.checkbox}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link
                className={styles.forgotPassword}
                to='/forgotPassword'
              >
                Forgot Password ?
              </Link>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>

            <p className={styles.registerPrompt}>
              <span className={styles.promptText}>Don't have an Account ?</span>
              <button
                type="button"
                className={styles.registerLink}
                tabIndex="0"
                onClick={() => loading("loading registration page")}
              >
                Register
              </button>
            </p>
          </form>
        </div>

        <div className={styles.imageColumn}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5845c1cad52b643613c76cc53bcf9d1781c1a02d026d4129bb046cd802d5255b?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
            className={styles.heroImage}
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};
