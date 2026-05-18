import React from "react";
import styles from "./Footer.module.css";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
];

const supportLinks = [
  { label: "Help center", href: "/help" },
  { label: "Terms of service", href: "/terms" },
  { label: "Legal", href: "/legal" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Status", href: "/status" },
];

const socialLinks = [
  {
    icon: "fa-brands fa-facebook",
    label: "Facebook",
    href: "https://facebook.com",
  },
  { icon: "fa-brands fa-x-twitter", 
    label: "Twitter", 
    href: "https://twitter.com" 
  },
  {
    icon: "fa-brands fa-instagram",
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: "fa-brands fa-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <div className={styles.copyright}>
            <p>Copyright © {new Date().getFullYear()} UESI</p>
            <p>All rights reserved</p>
          </div>
          <div className={styles.socialLinks}>
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className={styles.socialLink}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`${styles.socialIcon} ${icon}`}></i>
                {/* <img src={icon} alt="" className={styles.socialIcon} /> */}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linkColumns}>
          <nav className={styles.linkColumn} aria-label="Company links">
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkColumn} aria-label="Support links">
            <h3 className={styles.columnTitle}>Support</h3>
            <ul className={styles.linkList}>
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
