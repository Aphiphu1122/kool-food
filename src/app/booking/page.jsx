"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function Booking() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border">
          <h2 className="text-xl font-bold text-gray-800 mb-2">ข้อมูลลูกค้า</h2>
          <p className="text-sm text-gray-600 mb-4">
            โปรดกรอกข้อมูลสำหรับจองเพื่อความสะดวกในการให้บริการ ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับ
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">ชื่อ</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="กรอกชื่อของคุณ" />
            </div>

            <div>
              <label className="block text-gray-700">เบอร์ติดต่อ</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 bg-gray-200">🇹🇭</span>
                <input type="text" className="flex-1 p-2 outline-none" placeholder="กรอกเบอร์โทร" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="กรอกอีเมล" />
            </div>

            <div>
              <label className="block text-gray-700">หมายเหตุ <span className="text-red-500 text-sm">(ไม่จำเป็น)</span></label>
              <textarea className="w-full p-2 border rounded-md" rows="4" placeholder="ระบุหมายเหตุ (ถ้ามี)"></textarea>
              <p className="text-right text-xs text-gray-500">0/256</p>
            </div>

            

            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">ยืนยันการจอง</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
