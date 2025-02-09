"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import Transactions from "./Transactions";
import Chatbot from "./chat/simplechatbot";

export default function UserInfo() {
  const { data: session } = useSession();

  // State for transactions and balance
  const [userBalance, setUserBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false); // Chatbot Toggle State

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

  const calculateBalance = (transactions) => {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setUserBalance(balance);
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

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬
      </button>

      {/* Chatbot Component (Visible when toggled) */}
      {showChatbot && (
        <div
          className="fixed bottom-16 right-5 w-80 h-96 bg-white shadow-xl rounded-lg overflow-hidden z-50"
        >
          <Chatbot />
        </div>
      )}
    </div>
  );
}
