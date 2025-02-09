import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        // Authenticate user session
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email; 
        await connectMongoDB(); // Connect to MongoDB

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        
        const body = await req.json();
        const { description, amount, date } = body;

        if (!description || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        
        const newTransaction = {
            description,
            amount,
            date: date || new Date(),
        };

        
        user.transactions.push(newTransaction);
        await user.save(); 

        return NextResponse.json(
            { message: "Transaction added successfully", transaction: newTransaction },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding transaction:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        await connectMongoDB();

        // Find the user and return transactions
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const transactions = user.transactions || [];

        
        const totalIncome = transactions
            .filter((t) => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const balance = totalIncome - totalExpenses;

        return NextResponse.json(
            {
                transactions,
                summary: {
                    totalIncome,
                    totalExpenses,
                    balance,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
