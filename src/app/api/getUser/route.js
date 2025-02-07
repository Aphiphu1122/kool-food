import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
        }

        // ตรวจสอบ JWT Token
        const decoded = jwt.verify(token, SECRET_KEY);

        return NextResponse.json({
            success: true,
            user: {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            }
        });

    } catch (error) {
        console.error("❌ Error verifying token:", error);
        return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
}
