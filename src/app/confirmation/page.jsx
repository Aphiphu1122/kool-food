"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";

export default function Confirmation() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* ✅ ทำให้ Confirmation อยู่ตรงกลางทั้งแนวตั้งและแนวนอน */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border text-center flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">การจองสำเร็จ!</h2>
          <p className="text-gray-600 mb-4">
            ขอบคุณที่ใช้บริการของเรา คุณสามารถตรวจสอบรายละเอียดการจองในอีเมลของคุณ
          </p>

          {/* ✅ ปรับให้ปุ่มอยู่ตรงกลาง */}
          <div className="flex flex-col space-y-3 w-full">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
            >
              กลับไปหน้าแรก
            </button>

            <button
              onClick={() => router.push("/my-booking")}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center w-full"
            >
              <FaClipboardList className="mr-2" /> แสดงข้อมูลการจองของฉัน
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
