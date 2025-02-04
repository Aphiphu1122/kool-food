import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        await connectMongoDB();
        const user = await User.findOne({ email });

        // ตรวจสอบว่า user มีอยู่หรือไม่
        if (!user) {
            console.log("❌ User not found:", email);
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        // DEBUG: แสดงรหัสผ่านที่เข้ารหัส
        console.log("🔑 Hashed password from DB:", user.password);

        // เปรียบเทียบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("❌ Password mismatch:", password);
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        // สร้าง Token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        console.log("✅ Login successful for:", email);
        return NextResponse.json({ message: "Login successful", token }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "An error occurred during login.", error: error.message }, { status: 500 });
    }
}
