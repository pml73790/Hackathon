"use client";
import React, { useState } from "react";
import { FaBars, FaUserAlt } from "react-icons/fa";
import Link from "next/link";


const Navbar = ({ isAuthorized }) => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [filteredFlashcards, setFilteredFlashcards] = useState([]);


 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen);
 };

 const handleSearchChange = (e) => {
   const query = e.target.value;
   setSearchQuery(query);


   if (query) {
     fetchFlashcards(query);
   } else {
     setFilteredFlashcards([]); 
   }
 };


 
 const fetchFlashcards = async (query) => {
   try {
     const res = await fetch(`/api/getFlashcard?searchQuery=${query}`);
     const data = await res.json();
     if (res.ok) {
       setFilteredFlashcards(data.flashcards); 
     } else {
       console.error(data.error);
     }
   } catch (error) {
     console.error("Error fetching flashcards:", error);
   }
 };


 return (
   <div>
     <header className="max-w-screen-2xl mx-auto px-4 py-6">
       <nav className="flex justify-between items-center">
         {/* Left Side */}
         <div className="flex items-center md:gap-16 gap-4">
           <button onClick={toggleMenu}>
             <FaBars className="w-6 h-6" />
           </button>
         </div>


         {!isAuthorized && (
           <div className="relative sm:w-72 w-40 space-x-2">
             <input
               type="text"
               placeholder="Search flashcards"
               value={searchQuery}
               onChange={handleSearchChange}
               className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
             />
           </div>
         )}


   
         <div className="relative flex items-center md:space-x-2">
           <Link href="/">
             <FaUserAlt className="w-6 h-6" />
           </Link>
         </div>
       </nav>
     </header>


    
     {isMenuOpen && (
       <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 transition-transform duration-300 ease-in-out transform">
         <div className="flex flex-col p-4">
    
           <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
             X
           </button>


           {/* Menu Links */}
           <Link href="/" className="py-2">
             Home
           </Link>
           <Link href="/study" className="py-2">
             Study Mode
           </Link>
           <Link href="/grade" className="py-2">
             GPA Calculator
           </Link>
           <Link href="/about" className="py-2">
             About
           </Link>
           <Link href="/contact" className="py-2">
             Contact
           </Link>
         </div>
       </div>
     )}

{filteredFlashcards.length > 0 && (
  <div className="mt-6 max-w-screen-2xl mx-auto px-4">
    <h2 className="text-xl font-semibold mb-4">Search Results:</h2> {/* Reduced title size */}
    <ul>
      {filteredFlashcards.map((flashcard) => (
        <li key={flashcard._id} className="mb-2"> {/* Reduced margin between items */}
          <div className="bg-gray-100 p-2 rounded-md shadow-sm"> {/* Reduced padding */}
            <p className="font-semibold text-sm">{flashcard.question}</p> {/* Reduced font size */}
            <p className="text-gray-700 text-xs">{flashcard.answer}</p> {/* Reduced font size */}
          </div>
        </li>
      ))}
    </ul>
  </div>
)}
   </div>
 );
};


export default Navbar;


