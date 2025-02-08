import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction = models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
