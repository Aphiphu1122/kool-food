import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Booking from "../../../../../models/Booking";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "⛔ ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    }

    // ✅ ตรวจสอบ Token และดึง email ของ User
    const decoded = jwt.verify(token, SECRET_KEY);
    const userEmail = decoded.email;

    await connectMongoDB();
    
    // ✅ ดึงการจองล่าสุดของ User
    const latestBooking = await Booking.findOne({ email: userEmail }).sort({ createdAt: -1 });

    if (!latestBooking) {
      return NextResponse.json({ success: false, message: "⛔ ไม่พบข้อมูลการจอง" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: latestBooking }, { status: 200 });

  } catch (error) {
    console.error("🔥 Error ดึงข้อมูลการจองของ User:", error);
    return NextResponse.json({ success: false, message: "⛔ ไม่สามารถดึงข้อมูลการจองได้" }, { status: 500 });
  }
}
