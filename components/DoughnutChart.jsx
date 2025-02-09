"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/getTransactions");
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
  if (!transactions || transactions.length === 0) return <p>No transaction data available.</p>;

  
  const categoryMap = {};
  transactions.forEach(({ category, amount }) => {
    if (!category) category = "Uncategorized"; 
    categoryMap[category] = (categoryMap[category] || 0) + amount;
  });

 
  const categories = Object.keys(categoryMap);
  const amounts = Object.values(categoryMap);

  
  const backgroundColors = [
    "#0747b6", "#2265d8", "#2f91fa", "#4aafdd", "#6bc4e8", "#94d6f0", "#c2e9fa"
  ].slice(0, categories.length);

  const data = {
    datasets: [
      {
        label: "Transactions",
        data: amounts,
        backgroundColor: backgroundColors,
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
            display: true,
            position: "right",
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
