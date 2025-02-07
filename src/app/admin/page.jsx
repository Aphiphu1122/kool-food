"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold">แดชบอร์ดผู้ดูแลระบบ</h1>
      <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => router.push('/admin/bookings')}>
        ดูรายการจอง
      </button>
    </div>
  );
}
