import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}
