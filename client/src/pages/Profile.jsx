import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user); // Access current user
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar || ""); // Temporary avatar state  
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    setSuccessMessage(""); // Reset success message
    

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Mern_Project");
    data.append("cloud_name", "dyuvpsbmq");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dyuvpsbmq/image/upload", {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadedImage = await res.json();
      console.log("Uploaded Image URL:", uploadedImage.url);

      // Update the avatar state with the new URL
      setAvatar(uploadedImage.url);

      // (Optional) Send the new avatar URL to the backend
      await fetch("/api/update-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id, avatar: uploadedImage.url }),
      });

      // Show success message
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Hidden file input */}
        <input
          onChange={handleFileUpload}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        {/* Profile Image */}
        <img
          onClick={() => fileRef.current.click()}
          src={avatar || "/default-avatar.png"} // Use local state to show updated avatar
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-center font-medium">{successMessage}</p>
        )}

        {/* User Details */}
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        {/* Update Button */}
        <button
          className="bg bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading} // Disable while loading
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {/* Footer Actions */}
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
