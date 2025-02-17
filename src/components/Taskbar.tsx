"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white flex items-center h-14">
      {/* Start Icon and Menu */}
      <div className="relative">
        <button onClick={toggleStartMenu} className="start-button mr-2 -ml-1 m-auto">
          <Image
            src="/icons/win7start.png"
            alt="Start"
            width={44}
            height={24}
          />
        </button>
        {isStartOpen && (
          <div
            ref={startMenuRef}
            className="absolute bottom-12 left-0 bg-gray-200 border border-gray-400 p-4 rounded shadow-lg w-64"
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
              <li className="py-1">
                <Link href="/home">Home</Link>
              </li>
              <li className="py-1">
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* You can remove additional taskbar items if all navigation is now handled in the Start Menu */}
    </div>
  );
}
