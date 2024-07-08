import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
export default function ProfilePage() {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <UserProfile />
    </div>
  );
}
