"use client";
import Navbar from "@/components/navbar";

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/DecorImage/mountains.webp')" }}
    >
      <div className="w-full max-w-4xl p-8 text-center">
        <Navbar isAuthorized={true} />
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">About finchat</h1>
          <p className="text-lg mb-4">
           finchat manages your money 
          </p>
          <p className="text-lg mb-4">
            This whole site was built as a project for the <strong>UGAHACKX</strong>  at the University of Georgia (UGA). 
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
