"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Transactions({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "income",
  });

  // Fetch transactions from API
  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`/api/transactions/get?userId=${userId}`);
      const data = await res.json();
      setTransactions(data.transactions || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (!transaction.description || !transaction.amount || !transaction.date) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      userId,
      description: transaction.description,
      amount: transaction.type === "income" ? Math.abs(parseFloat(transaction.amount)) : -Math.abs(parseFloat(transaction.amount)),
      type: transaction.type,
      date: transaction.date,
    };

    try {
      const res = await fetch("/api/transactions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        fetchTransactions();
        setIsModalOpen(false);
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
      <div className="mt-4 bg-gray-50 border rounded-lg divide-y">
        {isLoading ? (
          <p className="text-center p-4">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center p-4">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium text-gray-700">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date.split("T")[0]}</p>
              </div>
              <p className={`font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding Transactions */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {transaction.type === "income" ? "Add Money In" : "Add Money Out"}
            </h2>

            <form onSubmit={handleAddTransaction} className="flex flex-col gap-3">
              <input
                type="text"
                name="description"
                value={transaction.description}
                onChange={handleChange}
                placeholder="Transaction Description"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
                placeholder="Amount ($)"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}