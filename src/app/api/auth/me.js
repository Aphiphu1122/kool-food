import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ success: true, user: decoded });

    } catch (_error) {
        return NextResponse.json({ success: false, message: "Token ไม่ถูกต้อง" }, { status: 401 });
    }
}
