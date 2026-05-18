import React, { useState, useEffect, useContext} from "react";
import { Button } from "../FormItems/Button/Button";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { success, error } from "../SmallFunc";
import { AuthContext } from "../AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Courses", to: "/courses" },
  { label: "Articles", to: "/articles" },
  { label: "Give", to: "/give" },
  { label: "About", to: "/about" },
];

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isLogin , setIsLogin, setIsAdmin} = useContext(AuthContext);

  const handleLogout = () => {
    fetch("http://localhost:8080/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsLogin(false);
          setIsAdmin(false);
          success("Logged out successfully");
        } else {
          error("Logout failed");
        }
      })
      .catch((err) => {
        console.error(err);
        error("An error occurred during logout");
      });
  };

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.navbarContent}>
        <Link to="/">
          <img src="/UESI_Logo.png" alt="UESI Logo" className={styles.logo} />
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mainMenu"
          aria-label="Toggle menu"
        >
          <span className={styles.menuIcon} />
        </button>

        <div
          id="mainMenu"
          className={`${styles.navbarMain} ${isMenuOpen ? styles.isOpen : ""}`}
        >
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </div>

          {isLogin ? (
            <div className={styles.authButtons}>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
