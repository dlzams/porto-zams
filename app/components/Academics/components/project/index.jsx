"use client";
import React from "react";
import styles from "./style.module.scss";

export default function Project({ index, title, year, onClick, manageModal }) {
  return (
    <div
      className={styles.project}
      onClick={onClick}
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
    >
      <h2>{title}</h2>
      <p>{year}</p>
    </div>
  );
}
