import mongoose, { Schema, models } from "mongoose";

// flashcard schema 
const transactionsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactions: {
      type: [transactionsSchema], // array of flashcard objects
      default: [], // default has no cards
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;