"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";

export default function UserInfo() {
  const { data: session } = useSession();

  // State for transactions and balance
  const [userBalance, setUserBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Transaction form state
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "income",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch transactions from API
  useEffect(() => {
    if (session?.user?.id) {
      fetchTransactions();
    }
  }, [session]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`/api/transactions/get?userId=${session?.user?.id}`);
      const data = await res.json();
      setTransactions(data.transactions || []);
      calculateBalance(data.transactions || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setIsLoading(false);
    }
  };

  // Calculate balance based on transactions
  const calculateBalance = (transactions) => {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setUserBalance(balance);
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
      userId: session?.user?.id,
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar isAuthorized={true} />

      {/* Main Content */}
      <div className="flex flex-col items-center py-10">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
          <header className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, <span>{session?.user?.name}</span>!
              </h1>
              <p className="text-gray-600">Email: {session?.user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Log Out
            </button>
          </header>

          {/* Account Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Account Overview</h2>
            <div className="bg-blue-100 p-4 rounded-lg mt-4 shadow-inner">
              <p className="text-gray-700">Current Balance</p>
              <h3 className={`text-3xl font-bold ${userBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${userBalance.toFixed(2)}
              </h3>
            </div>
          </section>

          {/* ➕ Buttons to Open Modal */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setTransaction({ ...transaction, type: "income" });
                setIsModalOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              + Money In
            </button>
            <button
              onClick={() => {
                setTransaction({ ...transaction, type: "expense" });
                setIsModalOpen(true);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              - Money Out
            </button>
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

          {/* Recent Transactions */}
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
          </section>
        </div>
      </div>
    </div>
  );
}
