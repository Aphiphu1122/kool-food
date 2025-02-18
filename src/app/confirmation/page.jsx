"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Confirmation() {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch("/api/booking/bookingcancel", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: "123456" }) // 🛑 **ต้องเปลี่ยนเป็น ID ที่ดึงมาจากฐานข้อมูล**
      });

      const data = await res.json();

      if (res.ok) {
        alert("การจองถูกยกเลิกเรียบร้อยแล้ว!");
        router.push("/");
      } else {
        alert(data.message || "ไม่สามารถยกเลิกการจองได้");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการยกเลิกการจอง");
    }
    setIsCancelling(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* ✅ ทำให้ Confirmation อยู่ตรงกลางทั้งแนวตั้งและแนวนอน */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border text-center flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">การจองสำเร็จ!</h2>
          <p className="text-gray-600 mb-4">ขอบคุณที่ใช้บริการของเรา คุณสามารถตรวจสอบรายละเอียดการจองในอีเมลของคุณ</p>
          
          {/* ✅ ปรับให้ปุ่มอยู่ตรงกลาง */}
          <div className="flex flex-col space-y-3 w-full">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
            >
              กลับไปหน้าแรก
            </button>

            <button
              onClick={handleCancelBooking}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center w-full"
              disabled={isCancelling}
            >
              {isCancelling ? "กำลังยกเลิก..." : <><FaTimesCircle className="mr-2" /> ยกเลิกการจอง</>}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
