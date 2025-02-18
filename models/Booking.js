import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true, // บันทึก email เป็นตัวพิมพ์เล็กเสมอ
      trim: true, // ลบช่องว่าง
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    numPeople: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // บันทึก createdAt & updatedAt อัตโนมัติ
);

// ป้องกันการ re-register model ในกรณี hot reload
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
