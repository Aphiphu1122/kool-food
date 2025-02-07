"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
          credentials: "include", // สำคัญ! ให้ส่ง cookies ด้วย
        });

        const data = await response.json();

        if (data.success) {
          setIsLoggedIn(true);
          setRole(data.user.role);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("❌ Fetch user error:", error);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login"); // กลับไปหน้า Login
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/">Koolkidklub</Link>
        </div>

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

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

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
              {role === "admin" && (
                <li>
                  <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Admin Panel
                  </Link>
                </li>
              )}
              
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
