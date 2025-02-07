import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: "ออกจากระบบสำเร็จ!" });

    // ✅ ลบ JWT Token ออกจาก Cookie
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // หมดอายุทันที
        sameSite: "strict"
    });

    return response;
}
