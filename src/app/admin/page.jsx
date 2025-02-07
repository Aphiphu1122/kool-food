"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // ดึงรายการจองจาก MongoDB
    fetch("/api/booking")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <div 
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('Bg1.webp')" }}
    >
      {/* ทำให้ Navbar ติดอยู่ด้านบน */}
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>

      {/* กรอบแดชบอร์ดอยู่ตรงกลาง (ไม่ให้ดัน Navbar ลงมา) */}
      <div className="h-full flex justify-center items-center pt-20">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl p-8 max-w-xl w-full mx-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
          <p className="text-gray-600 mt-2">จัดการข้อมูลการจองและการตั้งค่า</p>
          <button 
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition"
            onClick={() => router.push('/admin/bookings')}
          >
            ดูรายการจอง
          </button>
        </div>
      </div>
    </div>
  );
}
