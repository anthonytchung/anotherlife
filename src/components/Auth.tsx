"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        setEmail(`${email}@app.com`);
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created");
      } else {
        setEmail(email => `${email}@app.com`);
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Sign Up" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
        //   value={email}
        //   onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </button>
    </div>
  );
}
