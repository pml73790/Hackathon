import LoginForm from "@/components/LoginForm";
import HomePage from "@/components/home/Homepage";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main>
      
      {/* Render the Homepage component */}
      <HomePage />
      {/* Optionally, keep LoginForm or remove it */}
    </main>
  );
}
