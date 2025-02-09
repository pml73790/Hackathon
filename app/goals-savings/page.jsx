'use client';

import React, { useState } from 'react';

const GoalsSavingsPage = () => {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState(0);
  const [progress, setProgress] = useState(0);  // New state for progress
  const [savings, setSavings] = useState([]);

  const handleAddGoal = () => {
    setSavings([...savings, { goal, amount, progress }]);
    setGoal("");
    setAmount(0);
    setProgress(0);  // Reset progress after adding the goal
  };

  const handleProgressChange = (e, index) => {
    const newProgress = Number(e.target.value);
    setSavings((prevSavings) =>
      prevSavings.map((item, idx) =>
        idx === index ? { ...item, progress: newProgress } : item
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Goals & Savings</h1>

      {/* Goal input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="goal">Goal</label>
        <input
          id="goal"
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Progress input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="progress">Progress</label>
        <input
          id="progress"
          type="number"
          max={amount}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Enter progress made"
        />
      </div>

      {/* Add Goal Button */}
      <button onClick={handleAddGoal} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Goal
      </button>

      {/* Goals List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Goals</h2>
        {savings.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="font-medium">{item.goal}</p>
            <p>Target Amount: ${item.amount}</p>
            <p>Progress: ${item.progress}</p>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="bg-gray-200 h-2 rounded">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(item.progress / item.amount) * 100}%` }}
                ></div>
              </div>
              {/* Input to update progress */}
              <input
                type="number"
                value={item.progress}
                max={item.amount}
                onChange={(e) => handleProgressChange(e, index)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Update progress"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsSavingsPage;
