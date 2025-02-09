"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
        <p>No transaction data available.</p>
      </div>
    );
  }

  // Extract dates and amounts
  const dates = transactions.map((t) => new Date(t.date).toLocaleDateString());
  const amounts = transactions.map((t) => t.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Expenses",
        data: amounts,
        borderColor: "#0747b6",
        backgroundColor: "rgba(7, 71, 182, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
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
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toFixed(2)}`;
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