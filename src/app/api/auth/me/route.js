import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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



        // ✅ ส่งข้อมูลผู้ใช้กลับไป
        return NextResponse.json({
            success: true,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("❌ Error verifying token:", error);
        return NextResponse.json({ success: false, message: "❌ Invalid token" }, { status: 401 });
    }
}
