"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo({ onStudyClick }) {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <h1>
          Welcome, <span className="font-bold">{session?.user?.name}</span>!
        </h1>
        <div>Email: <span className="font-bold">{session?.user?.email}</span></div>
        
        <button
          onClick={onStudyClick} // Calls the function to show the homepage
          className="bg-green-500 text-white font-bold px-6 py-2 mt-3"
        >
          Study
        </button>
        
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
