"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaTimes, FaPlus } from "react-icons/fa";
import Navbar from "./Navbar";
import Chatbot from "./chat/simplechatbot";

export default function UserInfo() {
  const { data: session } = useSession();
  const [userBalance, setUserBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchTransactions();
    }
  }, [session]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`/api/getTransactions`);
      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(data || []);
      calculateBalance(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setIsLoading(false);
    }
  };

  const calculateBalance = (transactions) => {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setUserBalance(balance);
  };

  const handleAddTransaction = () => {
    setShowAddTransactionModal(true);
  };

  const handleSaveTransaction = async (newTransaction) => {
    try {
      const res = await fetch("/api/addTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session?.user?.email, 
          ...newTransaction,
        }),
      });

      if (res.ok) {
        fetchTransactions();
        setShowAddTransactionModal(false);
      } else {
        console.error("Failed to save transaction");
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
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

          {/* Recent Transactions */}
          <section className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <button
                onClick={handleAddTransaction}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600"
              >
                <FaPlus /> Add Transaction
              </button>
            </div>
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
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
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

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬
      </button>

      {/* Chatbot Component */}
      {showChatbot && (
        <div className="fixed bottom-20 right-5 w-[350px] h-[550px] bg-white shadow-xl rounded-lg overflow-auto z-50">
          <button
            onClick={() => setShowChatbot(false)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            <FaTimes />
          </button>
          <Chatbot />
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const description = formData.get("description");
                const amount = parseFloat(formData.get("amount"));

                if (!description || isNaN(amount)) {
                  alert("Please enter valid details!");
                  return;
                }

                handleSaveTransaction({
                  description,
                  amount,
                  date: new Date().toISOString(),
                });
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="description" className="mt-1 block w-full p-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" name="amount" step="0.01" className="mt-1 block w-full p-2 border rounded-md" required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddTransactionModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
