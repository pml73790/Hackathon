import React, { useState } from 'react';

const AddTransaction = ({ onAdd }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && description && date) {
            onAdd({ amount, description, date });
            setAmount('');
            setDescription('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-transaction-form">
            <h2>Add a New Transaction</h2>
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default AddTransaction;