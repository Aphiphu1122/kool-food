"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน!");
      setLoading(false);
      return;
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("อีเมลไม่ถูกต้อง");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "สมัครสมาชิกไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccess("สมัครสมาชิกสำเร็จ! กำลังเปลี่ยนเส้นทาง...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.error("❌ Error during registration:", error);
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center relative"
         style={{ backgroundImage: "url('/Bg3.jpg')" }}>
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

          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            สมัครสมาชิก
          </h3>

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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อของคุณ"
              autoFocus={error !== ""}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมลของคุณ"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="สร้างรหัสผ่าน"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-300 border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ยืนยันรหัสผ่าน"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
            </button>
          </form>

          <hr className="my-4" />
          
          <p className="text-center text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RegisterPage;
