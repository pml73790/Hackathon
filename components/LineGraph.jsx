"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions from MongoDB
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/getTransaction");
        const data = await res.json();
        setTransactions(data.transactions || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) return <p>Loading transactions...</p>;
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
        <p>No transaction data available.</p>
      </div>
    );
  }

  // Aggregate transactions by date
  const groupedTransactions = transactions.reduce((acc, { date, amount }) => {
    const formattedDate = new Date(date).toLocaleDateString();
    acc[formattedDate] = (acc[formattedDate] || 0) + amount;
    return acc;
  }, {});

  // Convert grouped data into sorted arrays
  const dates = Object.keys(groupedTransactions).sort((a, b) => new Date(a) - new Date(b));
  const amounts = dates.map((date) => groupedTransactions[date]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Daily Expenses",
        data: amounts,
        borderColor: "#0747b6",
        backgroundColor: "rgba(7, 71, 182, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return `Expense: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
