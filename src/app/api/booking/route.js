import { NextResponse } from "next/server";
import { connectMongoDB } from '../../../../lib/mongodb';
import Booking from "../../../../models/Booking";

// เชื่อมต่อ MongoDB
await connectMongoDB();

// ดึงรายการจองทั้งหมด (GET)
export async function GET() {
  try {
    const bookings = await Booking.find();
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// เพิ่มการจองใหม่ (POST)
export async function POST(req) {
  try {
    const { name, phone, date, time, numPeople } = await req.json();
    const newBooking = new Booking({ name, phone, date, time, numPeople });

    await newBooking.save();
    return NextResponse.json({ message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
