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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccess("เข้าสู่ระบบสำเร็จ! กำลังไปที่ Dashboard...");
      console.log("✅ เปลี่ยนหน้าไปที่ /dashboard...");

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
    <div className="flex flex-col min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/Bg4.jpg')" }}>
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="/kool_food_logo_1.png"
              alt="Koolfood Logo"
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

            {success && (
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
