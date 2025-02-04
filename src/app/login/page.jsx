"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ นำเข้า Footer
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
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

          <h3 className="text-2xl font-bold text-center mb-4">Login</h3>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mb-3">
                {error}
              </div>
            )}
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
              className="w-full bg-gray-300 border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <hr className="my-4" />
          

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
