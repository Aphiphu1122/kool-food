import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Reviews from "../../../../models/Reviews";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// 🔹 ดึงรีวิวทั้งหมด
export async function GET() {
  try {
    await connectMongoDB();
    const reviews = await Reviews.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch reviews:", error);
    return NextResponse.json({ success: false, error: "❌ Failed to fetch reviews" }, { status: 500 });
  }
}

// 🔹 เพิ่มรีวิวใหม่
export async function POST(req) {
  try {
    await connectMongoDB();

    console.log("🔍 Checking token...");
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("⚠️ No token provided");
      return NextResponse.json({ success: false, error: "Unauthorized: No token provided" }, { status: 401 });
    }

    console.log("✅ Token found, verifying...");
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
      console.log("✅ Token verified:", decoded);
    } catch (error) {
      console.error("❌ Invalid token:", error.message);
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
    }

    console.log("🔎 Fetching user from MongoDB...");
    const user = await User.findById(decoded.id).select("name");
    if (!user) {
      console.warn("⚠️ User not found in database:", decoded.id);
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const { comment, rating } = await req.json();

    // ตรวจสอบค่าที่รับเข้ามา
    if (!comment || typeof rating !== "number") {
      return NextResponse.json({ success: false, error: "❌ กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    console.log("✍️ Creating new review...");
    const newReview = new Reviews({
      user: user.name, // ใช้ชื่อจาก MongoDB
      comment,
      rating,
      createdAt: new Date(), // เพิ่ม timestamp
    });

    await newReview.save();
    console.log("✅ Review saved successfully:", newReview);

    return NextResponse.json({ success: true, message: "✅ รีวิวถูกบันทึกสำเร็จ", review: newReview }, { status: 201 });

  } catch (error) {
    console.error("❌ Failed to create review:", error);
    return NextResponse.json({ success: false, error: "❌ Failed to create review" }, { status: 500 });
  }
}
