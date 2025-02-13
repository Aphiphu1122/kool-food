export async function POST(req) {
  try {
    const { bookingId, phone } = await req.json();
    
    console.log("📌 รับค่าจาก Frontend:", { bookingId, phone });

    if (!bookingId && !phone) {
      return NextResponse.json({ success: false, message: "❌ กรุณาระบุหมายเลขการจองหรือเบอร์โทรศัพท์" }, { status: 400 });
    }

    await connectMongoDB();

    let booking;
    if (bookingId) {
      booking = await Booking.findById(new mongoose.Types.ObjectId(bookingId));
    } else if (phone) {
      booking = await Booking.findOne({ phone });
    }

    if (!booking) {
      return NextResponse.json({ success: false, message: "❌ ไม่พบข้อมูลการจอง" }, { status: 404 });
    }

    console.log("✅ พบข้อมูลการจอง:", booking);

    booking.status = "ยกเลิก";
    await booking.save();

    return NextResponse.json({ success: true, message: "✅ การจองถูกยกเลิกเรียบร้อยแล้ว!" });

  } catch (error) {
    console.error("🔥 Error ยกเลิกการจอง:", error);
    return NextResponse.json({ success: false, message: "❌ เกิดข้อผิดพลาดในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
