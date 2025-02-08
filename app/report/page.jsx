import React from "react";
import DoughnutChart from "@/components/DoughnutChart";
import Navbar from "@/components/Navbar";

const ReportPage = () => {
  // Sample transactions data
  const transactions = [
    { category: "Food", amount: 200 },
    { category: "Transport", amount: 100 },
    { category: "Entertainment", amount: 150 },
    { category: "Utilities", amount: 300 },
    { category: "Shopping", amount: 250 },
  ];

  // Calculate total spending
  const totalSpending = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div>
      {/* Add the Navbar component */}
      <Navbar isAuthorized={true} /> {/* Set isAuthorized based on your auth logic */}

      {/* Report Content */}
      <div style={styles.container}>
        <h1 style={styles.header}>Transaction Report</h1>
        <div style={styles.chartContainer}>
          <DoughnutChart transactions={transactions} />
        </div>
        <div style={styles.summary}>
          <h2>Summary</h2>
          <p>Total Spending: ${totalSpending.toLocaleString()}</p>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.category}: ${transaction.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the page
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  chartContainer: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "center",
  },
  summary: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default ReportPage;