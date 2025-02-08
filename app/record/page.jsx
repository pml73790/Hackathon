import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Finance from "@/models/Transaction";
import User from "@/models/user";
import { NextResponse } from "next/server";

// Handle POST request to add financial data
export async function POST(req) {
    try {
        // Authenticate user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user email from session
        const email = session.user.email;

        // Connect to MongoDB
        await connectMongoDB();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Parse incoming data
        const body = await req.json();
        const { income, expenses, savings, investments, budget } = body;

        // Create new finance record
        const newFinance = new Finance({
            user: user._id, // Link finance record to user
            income,
            expenses,
            savings,
            investments,
            budget,
        });

        // Save to database
        await newFinance.save();

        return NextResponse.json(
            { message: "Finance record created successfully", data: newFinance },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating finance record:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
