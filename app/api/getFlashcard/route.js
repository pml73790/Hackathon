import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function GET() {
   try {
       const session = await getServerSession(authOptions);
       if (!session || !session.user || !session.user.email) {
           return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
       }


       const email = session.user.email;


       await connectMongoDB();


       const user = await User.findOne({ email });
       if (!user) {
           return NextResponse.json({ error: "User not found" }, { status: 404 });
       }


       return NextResponse.json(
           { flashcards: user.flashcards },
           { status: 200 }
       );
   } catch (error) {
       console.error("Error retrieving flashcards:", error);
       return NextResponse.json(
           { error: "Internal server error" },
           { status: 500 }
       );
   }
}
