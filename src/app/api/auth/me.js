import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: decoded.userId });

    if (!user) {
      return NextResponse.json({ success: false, message: "ไม่พบข้อมูลผู้ใช้" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: user._id, name: user.name, email: user.email, role: user.role });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Token ไม่ถูกต้อง" }, { status: 401 });
  }
}
