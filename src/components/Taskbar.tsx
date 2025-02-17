"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Taskbar() {
  const router = useRouter();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleStartMenu = () => {
    setIsStartOpen((prev) => !prev);
  };

  // Close start menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setIsStartOpen(false);
      }
    }
    if (isStartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStartOpen]);

  return (
    <div className="taskbar relative">
      {/* Start Menu */}
      {isStartOpen && (
        <div
          ref={startMenuRef}
          className="start-menu absolute bottom-12 left-0 bg-gray-200 border border-gray-400 p-4 rounded shadow-lg w-64"
        >
          <ul>
            <li className="py-1">
              <Link href="/programs">Programs</Link>
            </li>
            <li className="py-1">
              <Link href="/documents">Documents</Link>
            </li>
            <li className="py-1">
              <Link href="/settings">Control Panel</Link>
            </li>
            <li className="py-1">
              <Link href="/search">Search</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Taskbar Items */}
      <div className="taskbar-items flex items-center">
        <button onClick={toggleStartMenu} className="taskbar-item mr-2">
          <img
            src="/icons/win7start.png"
            alt="Start"
            className="w-8 h-8" // Resize icon to 2rem x 2rem
          />
        </button>
        <Link href="/home" className="taskbar-item mr-4">
          Home
        </Link>
        <button onClick={handleLogout} className="taskbar-item">
          Logout
        </button>
      </div>
    </div>
  );
}
