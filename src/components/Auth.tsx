"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";
import Image from "next/image";

// Helper function to map Firebase errors to friendly messages
function getFriendlyErrorMessage(message: string): string {
  console.log(message);
  if (message.includes("invalid-credential")) {
    return "Invalid email address or password.";
  }
  if (message.includes("weak-password")) {
    return "Weak password. Your password should be at least 6 characters.";
  }
  if (message.includes("email-already-in-use")) {
    return "An account with this email already exists.";
  }
  if (message.includes("EMAIL_NOT_FOUND")) {
    return "No account found with this email.";
  }
  if (message.includes("INVALID_PASSWORD")) {
    return "Incorrect password. Please try again.";
  }
  return "An unexpected error occurred. Please try again.";
}

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/home");
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInAnonymously(auth);
      router.push("/home");
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-3/12">
      <div className="relative w-[200px] h-[200px] m-auto mb-24">
        <Image
          src="/win7pfp-border.png"
          width={200}
          height={200}
          alt="Border"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/win7accountpfp/user.bmp"
            width={130} // Adjust size as needed
            height={130} // Adjust size as needed
            alt="User Profile"
            // className="rounded-full"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </button>
      <button onClick={handleForgotPassword}>Forgot Password?</button>
      <button onClick={handleAnonymousSignIn} className="mt-10 p-5">
        Browse Anonymously
      </button>
      {error && <p className="text-red-600 font-bold">{error}</p>}
    </div>
  );
}
