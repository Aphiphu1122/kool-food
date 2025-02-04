"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
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

      // บันทึก Token ลง localStorage หรือ sessionStorage
      localStorage.setItem("token", data.token);

      // นำทางไปยังหน้าหลัก หรือ dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Login Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-md text-white"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Don't have an account? Go to{" "}
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
