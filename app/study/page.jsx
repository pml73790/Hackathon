"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const StudyMode = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flippedIndex, setFlippedIndex] = useState(null); // Track flipped flashcard index
    const router = useRouter(); // Initialize the router

    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await fetch("/api/getFlashcard");
            const data = await response.json();
            if (data.flashcards) {
                setFlashcards(data.flashcards);
            }
        };
        fetchFlashcards();
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setFlippedIndex(null); // Reset flip when changing card
        }
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFlippedIndex(null); // Reset flip when changing card
        }
    };

    const handleFlip = (index) => {
        setFlippedIndex(flippedIndex === index ? null : index); // Flip or unflip the selected card
    };

    const goToHomepage = () => {
        router.push('/'); // Navigate to the homepage
    };

    if (!flashcards.length) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    const currentFlashcard = flashcards[currentIndex];

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/DecorImage/mountains.webp')" }}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                {/* Question Display */}
                <h3 className="text-2xl font-semibold text-center mb-6 text-teal-600">
                    {currentFlashcard.question}
                </h3>

                {/* Flashcard with Flip Effect */}
                <div
                    onClick={() => handleFlip(currentIndex)}
                    className="relative w-full h-[400px] cursor-pointer perspective-1000"
                >
                    <div
                        className={`flip-card absolute w-full h-full transition-transform duration-500 transform ${
                            flippedIndex === currentIndex ? 'rotate-y-180' : ''
                        }`}
                    >
                        <div className="flip-card-inner w-full h-full">
                            {/* Front Side (Question) */}
                            <div className="flip-card-front bg-teal-500 flex items-center justify-center w-full h-full text-xl font-semibold text-white text-center rounded-lg shadow-lg">
                                {currentFlashcard.question}
                            </div>

                            {/* Back Side (Answer) */}
                            <div className="flip-card-back bg-white flex items-center justify-center w-full h-full text-lg text-gray-800 text-center rounded-lg absolute top-0 left-0 transform rotate-y-180 shadow-lg">
                                {currentFlashcard.answer}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 disabled:bg-gray-400"
                    >
                        &larr; {/* Left Arrow */}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === flashcards.length - 1}
                        className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 disabled:bg-gray-400"
                    >
                        &rarr; {/* Right Arrow */}
                    </button>
                </div>

                {/* Back to Homepage Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={goToHomepage}
                        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyMode;
