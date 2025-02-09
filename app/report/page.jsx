import React from "react";
import DoughnutChart from "@/components/DoughnutChart";
import LineChart from "@/components/LineGraph";
import Navbar from "@/components/Navbar";

const ReportPage = () => {
  // Sample transactions data with dates
  const transactions = [
    { category: "Food", amount: 200, date: "2023-10-01" },
    { category: "Transport", amount: 100, date: "2023-10-02" },
    { category: "Entertainment", amount: 150, date: "2023-10-03" },
    { category: "Utilities", amount: 300, date: "2023-10-04" },
    { category: "Shopping", amount: 250, date: "2023-10-05" },
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

        {/* Charts Container */}
        <div style={styles.chartsContainer}>
          {/* Doughnut Chart on the Left */}
          <div style={styles.doughnutChartWrapper}>
            <DoughnutChart transactions={transactions} />
          </div>

          {/* Line Graph on the Right */}
          <div style={styles.lineChartWrapper}>
            <LineChart transactions={transactions} />
          </div>
        </div>

        {/* Summary Section */}
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
    maxWidth: "1200px", // Increased maxWidth to accommodate side-by-side charts
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  chartsContainer: {
    display: "flex", // Use flexbox for side-by-side layout
    justifyContent: "space-between", // Space out the charts
    gap: "20px", // Add some spacing between the charts
    margin: "20px 0",
  },
  doughnutChartWrapper: {
    flex: 1, // Take up equal space
    display: "flex",
    justifyContent: "center", // Center the Doughnut Chart horizontally
    alignItems: "center", // Center the Doughnut Chart vertically
    backgroundColor: "#fff", // Optional: Add a background color
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  lineChartWrapper: {
    flex: 1, // Take up equal space
    backgroundColor: "#fff", // Optional: Add a background color
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  summary: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default ReportPage;