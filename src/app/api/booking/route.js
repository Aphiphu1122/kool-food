import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Booking from "../../../../models/Booking";

export async function GET() {
  try {
    await connectMongoDB();
    const bookings = await Booking.find();
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch bookings:", error);
    return NextResponse.json({ error: "❌ Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();
    console.log("📥 Received booking data:", body);

    let { name, phone, email, numPeople, date, time, notes } = body;

    if (!name || !phone || !numPeople || !date || !time) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "❌ กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    // Check and validate numPeople
    if (numPeople < 1 || numPeople > 10) {
      console.error("❌ Number of people must be between 1 and 10");
      return NextResponse.json({ error: "❌ จำนวนคนต้องอยู่ระหว่าง 1 ถึง 10" }, { status: 400 });
    }

    const newBooking = new Booking({ name, phone, email, numPeople, date, time, notes });
    await newBooking.save();

    console.log("✅ Booking saved successfully");
    return NextResponse.json({ message: "✅ การจองสำเร็จ!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create booking:", error);
    return NextResponse.json({ error: "❌ Failed to create booking" }, { status: 500 });
  }
}

