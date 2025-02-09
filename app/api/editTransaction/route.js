import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const { id, amount, description, date } = await request.json();

        if (!id || !amount || !description || !date) {
            return NextResponse.json(
                { error: "Transaction ID, amount, description, and date are required." },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: id, userEmail: email }, 
            { $set: { amount, description, date } }, 
            { new: true } 
        );

        if (!updatedTransaction) {
            return NextResponse.json(
                { error: "Transaction not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Transaction updated successfully", transaction: updatedTransaction },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating transaction:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}