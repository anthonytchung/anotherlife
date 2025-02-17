"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Taskbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="taskbar">
      <div className="start-button">
        <Link href="/start">Start</Link>
      </div>
      <div className="taskbar-items">
        <Link href="/home" className="taskbar-item">
          Home
        </Link>
        <button onClick={handleLogout} className="taskbar-item">
          Logout
        </button>
      </div>
    </div>
  );
}
