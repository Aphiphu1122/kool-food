import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Review from "../../../../models/Review";

export async function GET() {
  try {
    await connectMongoDB();
    const reviews = await Review.find();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch reviews:", error);
    return NextResponse.json({ error: "❌ Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { user, comment, rating } = await req.json();

    if (!user || !comment || !rating) {
      return NextResponse.json({ error: "❌ กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    const newReview = new Review({ user, comment, rating });
    await newReview.save();

    return NextResponse.json({ message: "✅ รีวิวถูกบันทึกสำเร็จ" }, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create review:", error);
    return NextResponse.json({ error: "❌ Failed to create review" }, { status: 500 });
  }
}
