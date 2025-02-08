"use client";

import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/DecorImage/finance-bg.webp')" }}
    >
      {/* Navbar */}
      <Navbar isAuthorized={true} />

      {/* Content */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            About FinChat
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to <strong>FinChat</strong>, your personal assistant for managing finances. Our platform helps users make smarter financial decisions by offering tailored insights, tracking expenses, and fostering better money habits.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This project was developed for <strong>UGAHACKX</strong> at the University of Georgia, showcasing the intersection of technology and finance.
          </p>
          <p className="text-lg text-gray-700">
            FinChat is built with cutting-edge technologies and a passion for helping users achieve financial freedom. Thank you for joining us on this journey!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          &copy; 2025 FinChat. All Rights Reserved. Built for UGAHACKX.
        </p>
      </footer>
    </div>
  );
};

export default About;
