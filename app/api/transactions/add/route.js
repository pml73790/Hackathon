import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, description, amount, type } = await req.json();

    const newTransaction = new Transaction({
      user: userId,
      description,
      amount,
      type,
    });

    await newTransaction.save();

    return NextResponse.json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    return NextResponse.json({ error: "Error adding transaction" }, { status: 500 });
  }
}
