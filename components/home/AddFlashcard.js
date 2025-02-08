import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js's useRouter for navigation
import backgroundImage from './DecorImage/mountains.webp'; // Adjust the path as needed

const AddFlashcard = () => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const router = useRouter(); // Replace useNavigate with useRouter

  const handleAddFlashcard = (event) => {
    event.preventDefault();

    // Retrieve existing flashcards from localStorage or initialize an empty array
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    // Add the new flashcard to the array
    flashcards.push({ front: frontText, back: backText });

    // Save updated flashcards back to localStorage
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    // Navigate back to the dashboard
    router.push('/FlashcardDashboard'); // Replace navigate with router.push
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1>Add New Flashcard</h1>
        <form onSubmit={handleAddFlashcard} style={styles.form}>
          <input
            type="text"
            placeholder="Front Text"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Back Text"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Flashcard</button>
        </form>
        <button onClick={() => router.push('/FlashcardDashboard')} style={styles.button}>Cancel</button>
      </div>
    </div>
  );
};

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
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    width: '300px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: '1.1rem',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};

export default AddFlashcard;
