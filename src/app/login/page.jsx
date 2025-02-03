"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

function LoginPage() {
  // State สำหรับจัดการข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-md py-5">
        <h3 className="text-xl font-bold text-center">Login Page</h3>
        <hr className="my-3" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <hr className="my-3" />

        {/* Register Link */}
        <p className="text-center text-gray-700">
          Already have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
