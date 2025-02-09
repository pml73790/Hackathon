"use client";
import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !message) {
      setStatus('Please fill in both fields.');
      return;
    }

    // Make POST request to backend to handle the form submission
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Your message has been sent successfully!');
      } else {
        setStatus(`Error: ${result.message}`);
      }

      // Clear form
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Error sending message. Please try again later.');
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center py-12 px-6"
      style={{ backgroundImage: "url('/DecorImage/mountains.webp')" }}
    >
      <div className="mt-16 w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-black mb-4">Contact Us</h1>
        <p className="text-lg text-black mb-6">If you have any questions or feedback, feel free to reach out to us!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {status && <p className="mt-4 text-lg text-white">{status}</p>}

        <div className="mt-8 text-center">
          <p className="text-lg text-white">Alternatively, you can email us directly at:</p>
          <a
            href="mailto:support@flashcardwebsite.com"
            className="text-lg text-blue-400 underline mt-2"
          >
            support@flashcardwebsite.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
