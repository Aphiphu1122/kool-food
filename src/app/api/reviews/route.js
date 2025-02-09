import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Reviews from "../../../../models/Reviews";

// ดึงรีวิวทั้งหมด
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


export async function POST(req) {
  try {
    await connectMongoDB();
    const { user, comment, rating } = await req.json();

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (!user || !comment || !rating) {
      return NextResponse.json({ success: false, error: "❌ กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    // สร้างรีวิวใหม่
    const newReview = new Reviews({ user, comment, rating });
    await newReview.save();

    return NextResponse.json({ success: true, message: "✅ รีวิวถูกบันทึกสำเร็จ", review: newReview }, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create review:", error);
    return NextResponse.json({ success: false, error: "❌ Failed to create review" }, { status: 500 });
  }
}
