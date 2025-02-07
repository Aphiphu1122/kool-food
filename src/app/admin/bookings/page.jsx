"use client";

import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/booking")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">รายการจองทั้งหมด</h1>
      <table className="w-full mt-4 border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ชื่อ</th>
            <th className="border p-2">เบอร์โทร</th>
            <th className="border p-2">วันที่</th>
            <th className="border p-2">เวลา</th>
            <th className="border p-2">จำนวนคน</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border">
              <td className="p-2">{booking.name}</td>
              <td className="p-2">{booking.phone}</td>
              <td className="p-2">{booking.date}</td>
              <td className="p-2">{booking.time}</td>
              <td className="p-2">{booking.numPeople}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
