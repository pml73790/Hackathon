"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.mainTitle}>FinChat</h1>
          <h2 style={styles.subtitle}>Your Gateway to Financial Freedom</h2>
          <nav>
            <Link href="/login">
              <button style={styles.button}>Login</button>
            </Link>
            <Link href="/register">
              <button style={styles.button}>Register</button>
            </Link>
          </nav>
        </header>

        <main style={styles.content}>
          <h3 style={styles.welcomeTitle}>Manage Your Finances With Ease</h3>
          <p style={styles.description}>
            Track your expenses, set budgets, and gain financial insights to make smarter decisions.
          </p>
          <div style={styles.featuresContainer}>
            <div style={styles.featureBox}>
              <h4>💰 Expense Tracking</h4>
              <p>Monitor your spending and stay on top of your finances.</p>
            </div>
            <div style={styles.featureBox}>
              <h4>📊 Budget Management</h4>
              <p>Set monthly budgets and achieve your financial goals.</p>
            </div>
            <div style={styles.featureBox}>
              <h4>📈 Investment Insights</h4>
              <p>Analyze your investments and optimize your portfolio.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: "url(/DecorImage/finance-bg.webp)", // Use a finance-related background
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
    padding: "2rem",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "1000px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
  mainTitle: {
    fontSize: "3rem",
    fontFamily: "'Montserrat', sans-serif",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "'Roboto', sans-serif",
    color: "#34495e",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    fontSize: "1.2rem",
    padding: "0.75rem 1.5rem",
    margin: "0.5rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  content: {
    marginTop: "2rem",
  },
  welcomeTitle: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "2rem",
  },
  featuresContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1rem",
  },
  featureBox: {
    width: "30%",
    padding: "1rem",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default HomePage;
