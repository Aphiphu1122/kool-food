"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

function RegisterPage() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white w-full max-w-md shadow-lg p-8 rounded-lg">
          <h3 className="text-3xl font-semibold text-center text-gray-800">Register</h3>
          <hr className="my-4" />

          <form action="" className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
