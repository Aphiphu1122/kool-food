import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "../../../../lib/mongodb";
import Booking from "../../../../models/Booking";


const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
  try {
    // ✅ ดึง Token จาก Cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("❌ No token found");
      return NextResponse.json({ success: false, message: "❌ No token found" }, { status: 401 });
    }

    // ✅ ตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("📌 Token ที่ถอดรหัสได้:", decoded);

    // ✅ เชื่อมต่อ MongoDB
    await connectMongoDB();

    // ✅ ตรวจสอบว่าเป็น Admin หรือไม่
    if (decoded.role !== "admin") {
      console.warn("⛔ Unauthorized Access: ผู้ใช้ไม่มีสิทธิ์เข้าถึง");
      return NextResponse.json({ success: false, message: "⛔ คุณไม่มีสิทธิ์เข้าถึงหน้านี้" }, { status: 403 });
    }

    // ✅ ดึงข้อมูลการจองจากฐานข้อมูล
    const bookings = await Booking.find();

    return NextResponse.json({ success: true, bookings }, { status: 200 });

  } catch (error) {
    console.error("🔥 Error fetching bookings:", error);
    return NextResponse.json({ success: false, message: "🔥 Failed to fetch bookings" }, { status: 500 });
  }
}
