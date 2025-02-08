import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Use Next.js Link
import backgroundImage from './DecorImage/mountains.webp'; // Adjust path as needed

const FlashcardDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null); // Track which card is flipped
  const router = useRouter(); // Use Next.js's useRouter

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/'); // Redirect to home if not logged in
    }

    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    setFlashcards(savedFlashcards);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home after logout
  };

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index); // Flip or unflip the selected card
  };

  // Inline CSS styles
  const styles = {
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      width: '80%',
      maxWidth: '1000px',
    },
    button: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '1.1rem',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '0.5rem',
      marginRight: '10px', // Adds space between buttons
    },
    flashcardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    flashcard: {
      width: '200px',
      height: '150px',
      perspective: '1000px',
      cursor: 'pointer',
    },
    flashcardInner: (isFlipped) => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      transform: isFlipped ? 'rotateY(180deg)' : 'none',
    }),
    flashcardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2em',
      padding: '20px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    front: {
      backgroundColor: '#f0f0f0',
    },
    back: {
      backgroundColor: '#d9edf7',
      transform: 'rotateY(180deg)',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        {isLoggedIn ? (
          <>
            <h1>Flashcard Dashboard</h1>
            {/* Replace react-router-dom Link with Next.js Link */}
            <Link href="/add-item">
              <a>
                <button style={styles.button}>Add New Item</button>
              </a>
            </Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>

            <h2>Your Flashcards:</h2>
            <div style={styles.flashcardContainer}>
              {flashcards.map((flashcard, index) => (
                <div
                  key={index}
                  style={styles.flashcard}
                  onClick={() => handleFlip(index)}
                >
                  <div style={styles.flashcardInner(flippedIndex === index)}>
                    <div style={{ ...styles.flashcardFace, ...styles.front }}>
                      {flashcard.front}
                    </div>
                    <div style={{ ...styles.flashcardFace, ...styles.back }}>
                      {flashcard.back}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Redirecting to Home...</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardDashboard;
