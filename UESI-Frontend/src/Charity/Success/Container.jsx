"use client";
import React from "react";
import styles from "./Container.module.css";
import ConfirmationBox from "./ConfirmationBox";

const Container = () => {
  return (
    <main className={styles.container}>
      <ConfirmationBox />
      <button
        className={styles.generateReceipt}
        onClick={() => {
          /* Handle receipt generation */
        }}
        aria-label="Generate donation receipt"
      >
        Generate Receipt
      </button>
    </main>
  );
};

export default Container;
