import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
        }

        await connectMongoDB();

        // ✅ ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "อีเมลนี้ถูกใช้ไปแล้ว" }, { status: 409 });
        }

        // ✅ บันทึกโดยให้ Mongoose Hash Password ให้อัตโนมัติ
        const newUser = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password, // ❌ ห้าม `hash` ตรงนี้ เพราะ `pre("save")` จะทำให้
        });

        return NextResponse.json({
            success: true,
            message: "สมัครสมาชิกสำเร็จ!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        }, { status: 201 });

    } catch (error) {
        console.error("🔥 Register Error:", error);
        return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์", error: error.message }, { status: 500 });
    }
}
