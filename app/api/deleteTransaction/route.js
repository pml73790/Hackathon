import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 

        if (!id) {
            return NextResponse.json(
                { error: "Transaction ID is required as a query parameter." },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Ensure the transaction belongs to the authenticated user before deleting
        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: id,
            userEmail: email, // Ensure the transaction belongs to the user
        });

        if (!deletedTransaction) {
            return NextResponse.json(
                { error: "Transaction not found or you do not have permission to delete it." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Transaction deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}