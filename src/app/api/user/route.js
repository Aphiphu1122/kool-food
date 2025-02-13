import { NextResponse } from "next/server";
import { connectMongoDB } from '../../../../lib/mongodb';
import jwt from "jsonwebtoken";
import User from "../../../../models/user";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
    try {
        await connectMongoDB();

       
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

 
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
}
