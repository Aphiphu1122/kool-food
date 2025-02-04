import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);

        await connectMongoDB();
        const user = await User.findById(decoded.id).select("-password"); // ไม่ส่งรหัสผ่านกลับไป

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
