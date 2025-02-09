import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema({
  userEmail: { type: String, required: true }, 
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
