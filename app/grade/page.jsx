"use client";
import React from 'react';
import GradeCalculator from '@/components/GradeCalculator';
import Navbar from '@/components/navbar';

const GradePage = () => {
  return (
    <>
     
      <Navbar isAuthorized={true} /> 

      <div
        className="flex flex-col min-h-screen bg-cover bg-center py-12 px-6"
        style={{ backgroundImage: "url('/DecorImage/mountains.webp')" }} 
      >
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mt-16">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Grade Calculator</h1>
            <p className="text-lg text-gray-600 mb-6">Track and calculate grades for your classes!</p>

            
            <GradeCalculator />
          </div>
        </div>
      </div>
    </>
  );
};

export default GradePage;
