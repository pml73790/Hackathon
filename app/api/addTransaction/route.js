import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const { amount, description, date } = await request.json();

        // Validate required fields
        if (!amount || !description || !date) {
            return NextResponse.json(
                { error: "Amount, description, and date are required." },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Create a new transaction
        const newTransaction = new Transaction({
            userEmail: email, // Associate the transaction with the user
            amount,
            description,
            date,
        });

        // Save the transaction to the database
        await newTransaction.save();

        return NextResponse.json(
            { message: "Transaction added successfully", transaction: newTransaction },
            { status: 201 } // 201 status code for resource creation
        );
    } catch (error) {
        console.error("Error adding transaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}