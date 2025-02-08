"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Enter all fields");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div
      className="grid place-items-center h-screen"
      style={{
        backgroundImage: "url('/DecorImage/mountains.webp')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-400 bg-white bg-opacity-80">
        <h1 className="text-xl font-bold my-4">Sign-up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded-md"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="p-2 border rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
