import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        console.log("🔹 Received request to add transaction");

        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            console.error("❌ Unauthorized access");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount, description, date } = await request.json();

        if (!amount || !description || !date) {
            console.error("❌ Missing required fields");
            return NextResponse.json(
                { error: "Amount, description, and date are required." },
                { status: 400 }
            );
        }

        console.log("🔹 Connecting to MongoDB...");
        await connectMongoDB();
        console.log("✅ MongoDB Connected");

        const newTransaction = new Transaction({
            userEmail: session.user.email,
            amount,
            description,
            date,
        });

        console.log("📌 Saving transaction:", newTransaction);
        await newTransaction.save();
        console.log("✅ Transaction saved successfully");

        return NextResponse.json(
            { message: "Transaction added successfully", transaction: newTransaction },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error adding transaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
