"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ เพิ่มข้อความสำเร็จ
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // ✅ ล้างข้อความก่อน Login
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ ส่ง Cookie ไปพร้อมกับ Request
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      // ✅ แสดงข้อความสำเร็จ
      setSuccess("เข้าสู่ระบบสำเร็จ! กำลังไปที่ Dashboard...");
      console.log("✅ เปลี่ยนหน้าไปที่ /dashboard...");

      // ✅ หน่วงเวลา 1 วินาทีก่อนเปลี่ยนหน้า
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("❌ Login error:", error);
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="/kool_food_logo_1.png"
              alt="Koolkidklub Logo"
              className="w-34 h-34"
            />
          </div>

          <h3 className="text-2xl font-bold text-center mb-4">เข้าสู่ระบบ</h3>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mb-3">
                {error}
              </div>
            )}

            {success && ( // ✅ แสดงข้อความเมื่อ Login สำเร็จ
              <div className="bg-green-500 text-white text-sm py-2 px-4 rounded-md mb-3">
                {success}
              </div>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมลของคุณ"
              autoFocus={error !== ""}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกรหัสผ่านของคุณ"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <hr className="my-4" />

          <p className="text-center text-gray-600">
            ยังไม่มีบัญชี?{" "}
            <Link className="text-blue-500 hover:underline" href="/register">
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default LoginPage;
