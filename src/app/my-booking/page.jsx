"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle } from "react-icons/fa";

export default function Confirmation() {
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch("/api/booking/user", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "ไม่พบข้อมูลการจอง");
        }

        setBooking(data.booking);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">การจองสำเร็จ!</h2>
          <p className="text-gray-600 mb-4">ขอบคุณที่ใช้บริการของเรา คุณสามารถตรวจสอบรายละเอียดการจองของคุณด้านล่าง</p>

          {loading ? (
            <p className="text-gray-500">กำลังโหลดข้อมูลการจอง...</p>
          ) : error ? (
            <p className="text-red-500">❌ {error}</p>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-left">
              <p className="font-bold">📅 วันที่จอง:</p>
              <p>{new Date(booking.date).toLocaleDateString()}</p>

              <p className="font-bold mt-2">⏰ เวลา:</p>
              <p>{booking.time}</p>

              <p className="font-bold mt-2">👤 จำนวนคน:</p>
              <p>{booking.numPeople} คน</p>

              <p className="font-bold mt-2">📞 เบอร์โทรศัพท์:</p>
              <p>{booking.phone}</p>
            </div>
          )}

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
          >
            กลับไปหน้าแรก
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
