"use client";
import React from 'react';
import Navbar from '../navbar'; // Ensure Navbar is correctly exported
import './LoggedIn.css';

const HomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <div className="homepage-container">
                <header className="homepage-header">
                    <h1>Welcome to FinChat</h1>
                    <p>bla bla</p>
                </header>
                
                <main className="flashcard-section">
                </main>
            </div>
        </div>
    );
};

export default HomePage;
