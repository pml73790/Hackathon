import React, { useState, useEffect } from "react";
import Transaction from "./Transactions";
import AddTransaction from "./addTransaction";


const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch("/api/getTransaction");
                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }
                const data = await response.json();
                setTransactions(data.transactions);
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/addTransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTransaction),
            });
            if (!response.ok) {
                throw new Error("Failed to add transaction");
            }
            const { transaction } = await response.json();
            setTransactions([...transactions, transaction]);
        } catch (err) {
            setError(err.message || "An error occurred while adding the transaction");
        } finally {
            setLoading(false);
        }
    };

    const editTransaction = async (id, updatedAmount, updatedDescription, updatedDate) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/editTransaction", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    amount: updatedAmount,
                    description: updatedDescription,
                    date: updatedDate,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to edit transaction");
            }
            const { transaction } = await response.json();

            // Update the state with the edited transaction
            setTransactions(transactions.map((t) =>
                t._id === id ? { ...t, amount: transaction.amount, description: transaction.description, date: transaction.date } : t
            ));
        } catch (err) {
            setError(err.message || "An error occurred while editing the transaction");
        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`/api/deleteTransaction?id=${encodeURIComponent(id)}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }
            setTransactions(transactions.filter((t) => t._id !== id));
        } catch (err) {
            setError(err.message || "An error occurred while deleting the transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AddTransaction onAdd={addTransaction} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="transaction-list">
                {transactions.map((t) => (
                    <Transaction
                        key={t._id}
                        id={t._id}
                        amount={t.amount}
                        description={t.description}
                        date={t.date}
                        onEdit={editTransaction}
                        onDelete={deleteTransaction}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransactionList;