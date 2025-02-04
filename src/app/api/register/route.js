import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        await connectMongoDB();

        // ตรวจสอบว่าอีเมลนี้ถูกใช้ไปแล้วหรือยัง
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // เข้ารหัสรหัสผ่านก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Hashed Password:", hashedPassword);

        // บันทึกผู้ใช้ลงในฐานข้อมูล
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "An error occurred while registering the user.", error: error.message }, { status: 500 });
    }
}
