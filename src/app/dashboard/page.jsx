"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-5">
      <h3 className="text-xl font-bold">Dashboard</h3>
      <p>Welcome, {user?.email || "User"}!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
