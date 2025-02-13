"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();

        if (!res.ok || data.role !== "admin") {
          router.push("/"); // Redirect ออกถ้าไม่ใช่ Admin
          return;
        }

        setUser(data);
      } catch (error) {
        router.push("/"); // Redirect ออกถ้าเกิดข้อผิดพลาด
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: "url('Bg9.jpg')",
        backgroundColor: "#f5e1c8",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>

      <div className="h-full flex justify-center items-center pt-20">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl p-8 max-w-xl w-full mx-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
          <p className="text-gray-600 mt-2">จัดการข้อมูลการจองและการตั้งค่า</p>
          <p className="text-gray-500 mt-2">ยินดีต้อนรับ {user?.name} ({user?.role})</p>
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
