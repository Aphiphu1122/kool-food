"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle } from "react-icons/fa";

export default function Confirmation() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">การจองสำเร็จ!</h2>
          <p className="text-gray-600 mb-4">ขอบคุณที่ใช้บริการของเรา คุณสามารถตรวจสอบรายละเอียดการจองในอีเมลของคุณ</p>
          
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 mt-4"
          >
            กลับไปหน้าแรก
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
