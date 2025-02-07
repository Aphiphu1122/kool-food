"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: "POST",
            credentials: "include"
        });

        router.push("/login"); // กลับไปหน้า Login
    } catch (error) {
        console.error("Logout Error:", error);
    }
};


  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Koolkidklub</Link>
        </div>

        {/* Search Box (Hidden on Mobile) */}
        <div className="hidden md:flex flex-grow justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Menu Button for Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul className={`md:flex md:space-x-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 transition-transform ${menuOpen ? "block" : "hidden"}`}>
          {!isLoggedIn ? (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-300 transition">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gray-300 transition">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
