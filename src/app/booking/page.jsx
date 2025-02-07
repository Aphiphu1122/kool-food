"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";

export default function Booking() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const bookingData = { name, phone, email, numPeople, date, time: selectedTime, notes };
    
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ การจองสำเร็จ!");
        setTimeout(() => router.push("/confirmation"), 2000);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-4">
        <button
          onClick={() => router.push("/aboutfood")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft size={20} />
          <span>ย้อนกลับ</span>
        </button>
      </div>

      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border">
          <h2 className="text-xl font-bold text-gray-800 mb-2">ข้อมูลลูกค้า</h2>
          <p className="text-sm text-gray-600 mb-4">
            โปรดกรอกข้อมูลสำหรับจองเพื่อความสะดวกในการให้บริการ ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับ
          </p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">ชื่อ</label>
              <input type="text" className="w-full p-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700">เบอร์ติดต่อ</label>
              <input type="text" className="w-full p-2 border rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">จำนวนคน</label>
                <input type="number" className="w-full p-2 border rounded-md" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700">วันที่</label>
                <input type="date" className="w-full p-2 border rounded-md" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700">เวลาทำการ</label>
                <select className="w-full p-2 border rounded-md" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                  <option value="">เลือกเวลา</option>
                  <option value="11:00-14:00">11:00 - 14:00</option>
                  <option value="17:00-21:00">17:00 - 21:00</option>
                  <option value="ทั้งวัน">ทั้งวัน</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700">หมายเหตุ <span className="text-red-500 text-sm">(ไม่จำเป็น)</span></label>
              <textarea className="w-full p-2 border rounded-md" rows="4" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>

            {message && <p className="text-center text-sm font-semibold text-red-600">{message}</p>}
            
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700" disabled={loading}>
              {loading ? "กำลังส่งข้อมูล..." : "ยืนยันการจอง"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
