import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import jwt from "jsonwebtoken";
import User from "../../../../models/user";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
    try {
        await connectMongoDB();

        console.log("🔍 Checking token...");

        // ตรวจสอบว่ามี token หรือไม่
        const token = req.cookies.get("token")?.value;
        if (!token) {
            console.warn("⚠️ No token provided");
            return NextResponse.json(
                { success: false, message: "Unauthorized: No token provided" },
                { status: 401 }
            );
        }

        console.log("✅ Token found, verifying...");

        // ตรวจสอบว่า token ถูกต้องหรือไม่
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
            console.log("✅ Token verified:", decoded);
        } catch (error) {
            console.error("❌ Invalid token:", error.message);
            return NextResponse.json(
                { success: false, message: "Invalid or expired token" },
                { status: 401 }
            );
        }

        console.log("🔎 Fetching user from MongoDB...");

        // ดึงข้อมูล user จาก MongoDB โดยไม่รวม password
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.warn("⚠️ User not found in database:", decoded.id);
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        console.log("✅ User found:", user.email);

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error("❌ Error in /api/user:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
