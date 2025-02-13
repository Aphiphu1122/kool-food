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

        
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        console.log(`✅ Login สำเร็จ: ${email}, Role: ${user.role}`);

        
        const response = NextResponse.json({
            success: true,
            message: "เข้าสู่ระบบสำเร็จ!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600, // 1 ชั่วโมง
            sameSite: "strict"
        });

        return response;

    } catch (error) {
        console.error("🔥 Login error:", error);
        return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์", error: error.message }, { status: 500 });
    }
}
