"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const LoggedIn = () => {
  const [text, setText] = useState("");
  const welcomeMessage = "Weelcome to the Finance Management App!";
  const typingSpeed = 100; // Speed of the typing animation in milliseconds
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex+1 < welcomeMessage.length) {
        setText((prevText) => prevText + welcomeMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval); // Correctly clear the interval
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [welcomeMessage, typingSpeed]); // Add dependencies to avoid stale state

  // Function to handle the "Get Started" button click
  const handleGetStarted = () => {
    router.push("/transactions"); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{text}</h1>
      <p style={styles.subheading}>Start managing your finances with ease.</p>

      {/* "Get Started" Button */}
      <button style={styles.button} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    color: "#333",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px", // Added margin to separate from the button
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
};

export default LoggedIn;