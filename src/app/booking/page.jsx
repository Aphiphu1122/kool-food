"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { FaArrowLeft } from 'react-icons/fa';

export default function Booking() {
  const router = useRouter(); // ใช้ useRouter สำหรับเปลี่ยนหน้า
  const [numPeople, setNumPeople] = useState(""); // จำนวนคน
  const [date, setDate] = useState(""); // วันที่
  const [selectedTime, setSelectedTime] = useState(""); // เวลาทำการ

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ปุ่มย้อนกลับ */}
      <div className="p-4">
        <button
          onClick={() => router.push('/aboutfood')}
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
          
          <form className="space-y-4">
            {/* ชื่อ */}
            <div>
              <label className="block text-gray-700">ชื่อ</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="กรอกชื่อของคุณ" />
            </div>

            {/* เบอร์ติดต่อ */}
            <div>
              <label className="block text-gray-700">เบอร์ติดต่อ</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 bg-gray-200">🇹🇭</span>
                <input type="text" className="flex-1 p-2 outline-none" placeholder="กรอกเบอร์โทร" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="กรอกอีเมล" />
            </div>

            {/* จำนวนคน + วันที่ + เวลาทำการ */}
            <div className="grid grid-cols-3 gap-4">
              {/* จำนวนคน */}
              <div>
                <label className="block text-gray-700">จำนวนคน</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  placeholder="จำนวนคน"
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                />
              </div>

              {/* วันที่ */}
              <div>
                <label className="block text-gray-700">วันที่</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* เวลาทำการ */}
              <div>
                <label className="block text-gray-700">เวลาทำการ</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">เลือกเวลา</option>
                  <option value="11:00-14:00">11:00 - 14:00</option>
                  <option value="17:00-21:00">17:00 - 21:00</option>
                  <option value="ทั้งวัน">ทั้งวัน</option>
                </select>
              </div>
            </div>

            {/* หมายเหตุ */}
            <div>
              <label className="block text-gray-700">
                หมายเหตุ <span className="text-red-500 text-sm">(ไม่จำเป็น)</span>
              </label>
              <textarea className="w-full p-2 border rounded-md" rows="4" placeholder="ระบุหมายเหตุ (ถ้ามี)"></textarea>
              <p className="text-right text-xs text-gray-500">0/256</p>
            </div>

            {/* ปุ่มยืนยันการจอง */}
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              ยืนยันการจอง
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
