"use client";

import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/booking");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">รายการจองทั้งหมด</h1>
      {loading ? (
        <p className="text-center">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-red-500 text-center">❌ {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border border-gray-400 shadow-lg rounded-lg text-sm text-gray-800">
            <thead>
              <tr className="bg-gray-300 border-b border-gray-400 text-left">
                <th className="border-r border-gray-400 px-4 py-2">ชื่อ</th>
                <th className="border-r border-gray-400 px-4 py-2">เบอร์โทร</th>
                <th className="border-r border-gray-400 px-4 py-2">วันที่</th>
                <th className="border-r border-gray-400 px-4 py-2">เวลา</th>
                <th className="px-4 py-2">จำนวนคน</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id || index} className="border-b border-gray-400 hover:bg-gray-200">
                  <td className="border-r border-gray-400 px-4 py-2">{booking.name}</td>
                  <td className="border-r border-gray-400 px-4 py-2">{booking.phone}</td>
                  <td className="border-r border-gray-400 px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="border-r border-gray-400 px-4 py-2">{booking.time}</td>
                  <td className="px-4 py-2 text-center">{booking.numPeople}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}