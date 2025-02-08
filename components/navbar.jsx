"use client";
import React, { useState } from "react";
import { FaBars, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

const Navbar = ({ isAuthorized }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-800 text-white px-6 py-4 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars className="w-6 h-6" />
          </button>
          <Link href="/" className="text-2xl font-bold">
            FinChat
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isAuthorized ? (
            <Link href="/profile">
              <FaUserAlt className="w-6 h-6 cursor-pointer" />
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-gray-200 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-50 transition-transform transform">
          <div className="flex flex-col p-4">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
              X
            </button>
            <Link href="/" className="py-2">Home</Link>
            <Link href="/accounts" className="py-2">Accounts</Link>
            <Link href="/transactions" className="py-2">Transactions</Link>
            <Link href="/budget" className="py-2">Budget</Link>
            <Link href="/report" className="py-2">Reports</Link>
            <Link href="/profile" className="py-2">Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
