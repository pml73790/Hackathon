"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [photo, setPhoto] = useState(session?.user?.image || "/default-avatar.png");
  const [isLoading, setIsLoading] = useState(false);

  // Mock account creation date (replace with actual data from your backend)
  const accountCreationDate = new Date(session?.user?.createdAt || "2023-01-01").toLocaleDateString();

  // Handle file upload for photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your API to update user data in MongoDB
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, name, image: photo }),
      });

      if (res.ok) {
        // Update the session
        await update({ name, image: photo });
        setIsEditing(false);
      } else {
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </header>

        {/* User Info Section */}
        <section className="flex flex-col items-center space-y-4">
          {/* User Avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            <img
              src={photo}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label
                htmlFor="photo-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
              >
                <span className="text-white text-sm">Edit</span>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          {/* User Name and Email */}
          <div className="text-center">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-2xl font-bold text-gray-800 border p-2 rounded text-center"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            )}
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>

          {/* Account Creation Date */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Account created on: <span className="font-semibold">{accountCreationDate}</span>
            </p>
          </div>

          {/* Edit/Save Button */}
          <div className="mt-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}