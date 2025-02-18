import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "กรุณากรอกอีเมลและรหัสผ่าน" }, { status: 400 });
        }

        await connectMongoDB();
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            console.warn(`⚠️ Login ล้มเหลว: ไม่พบผู้ใช้ที่มีอีเมล ${email}`);
            return NextResponse.json({ success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`⚠️ Login ล้มเหลว: รหัสผ่านไม่ถูกต้อง (${email})`);
            return NextResponse.json({ success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
        }

        // ✅ สร้าง JWT Token
        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        console.log(`✅ Login สำเร็จ: ${email}, Role: ${user.role}`);

        // ✅ ตั้งค่า `Set-Cookie` อย่างถูกต้อง
        const response = NextResponse.json({
            success: true,
            message: "เข้าสู่ระบบสำเร็จ!",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${
                process.env.NODE_ENV === "production" ? "; Secure" : ""
            }`
        );

        return response;

    } catch (error) {
        console.error("🔥 Login error:", error);
        return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์", error: error.message }, { status: 500 });
    }
}
