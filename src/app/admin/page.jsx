"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/getUser", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        
        const data = await res.json();
        console.log("📌 ข้อมูลผู้ใช้ที่ได้รับจาก API:", data);

        if (!res.ok || !data.success || data.user.role !== "admin") {
          setError("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
          setTimeout(() => router.push("/"), 3000);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("🔥 เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">กำลังโหลดข้อมูล...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/Bg9.jpg')",
        backgroundColor: "#fffff",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>

      {/* Dashboard Content */}
      <div className="h-full flex justify-center items-center pt-20">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl p-8 max-w-xl w-full mx-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
          <p className="text-gray-600 mt-2">จัดการข้อมูลการจองและการตั้งค่า</p>
          <p className="text-gray-500 mt-2">
            ยินดีต้อนรับ {user?.name} ({user?.role})
          </p>
          <button
            className="bg-[#a93a3afd] text-white px-4 py-2 mt-4 rounded-md hover:bg-[#973535] transition"
            onClick={() => router.push("/admin/bookings")}
          >
            ดูรายการจอง
          </button>
        </div>
      </div>
    </div>
  );
}