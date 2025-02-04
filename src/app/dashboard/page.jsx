"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // ถ้าไม่มี Token ให้กลับไปหน้า Login
      return;
    }

    // ดึงข้อมูลผู้ใช้จาก API (optional)
    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setUser(data.user);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ Token ออกจาก localStorage
    router.push("/login"); // กลับไปหน้า Login
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto py-10 flex-grow text-center">
        <h3 className="text-2xl font-bold mb-4">Dashboard</h3>
        <p className="text-lg">Welcome, <span className="font-semibold">{user?.email || "User"}</span>!</p>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded mt-6 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardPage;
