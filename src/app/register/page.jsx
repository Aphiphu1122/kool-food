"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "User registration failed.");
        return;
      }

      setError("");
      setSuccess("User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error during registration: ", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          

          <div className="flex justify-center mb-6">
            <img
              src="/kool_food_logo_1.png"
              alt="Koolkidklub Logo"
              className="w-34 h-34"
            />
          </div>

          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Sign Up</h3>
          

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mb-3">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500 text-white text-sm py-2 px-4 rounded-md mb-3">
                {success}
              </div>
            )}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </form>

          <hr className="my-4" />
          
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RegisterPage;
