"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ transactions }) => {
  // Check if transactions is defined
  if (!transactions || transactions.length === 0) {
    return <p>No transaction data available.</p>;
  }

  // Extract transaction categories and amounts
  const categories = transactions.map((t) => t.category);
  const amounts = transactions.map((t) => t.amount);

  const data = {
    datasets: [
      {
        label: "Transactions",
        data: amounts,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa", "#4aafdd", "#6bc4e8"],
      },
    ],
    labels: categories,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;