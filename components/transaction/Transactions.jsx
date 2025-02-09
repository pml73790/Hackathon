import React, { useState } from "react";

const Transaction = ({ id, amount, description, date, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newAmount, setNewAmount] = useState(amount);
    const [newDescription, setNewDescription] = useState(description);
    const [newDate, setNewDate] = useState(date);

    const handleSave = () => {
        if (newAmount.trim() === "" || newDescription.trim() === "" || newDate.trim() === "") {
            alert("Amount, description, and date cannot be empty.");
            return;
        }
        onEdit(id, newAmount, newDescription, newDate); 
        setIsEditing(false); 
    };

    return (
        <div className="transaction">
            {isEditing ? (
                <>
                    <input
                        type="number"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        placeholder="Edit amount"
                    />
                    <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Edit description"
                    />
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        placeholder="Edit date"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p><strong>Amount:</strong> ${amount}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default Transaction;