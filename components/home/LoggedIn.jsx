"use client";
import React from 'react';
import Navbar from '../Navbar'; // Ensure Navbar is correctly exported
import './LoggedIn.css';

const HomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <div className="homepage-container">
                <header className="homepage-header">
                    <h1>Welcome to One-Flash</h1>
                    <p>Organize, create, and review your flashcards all in one place.</p>
                </header>
                
                <main className="flashcard-section">
                    
                </main>
            </div>
        </div>
    );
};

export default HomePage;