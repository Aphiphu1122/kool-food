import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "กรุณากรอกชื่อ"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "กรุณากรอกอีเมล"],
            unique: true, // ป้องกันอีเมลซ้ำ
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "กรุณากรอกรหัสผ่าน"],
            minlength: [6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"],
        },
        role: {
            type: String,
            enum: ["user", "admin"], // จำกัดให้มีแค่ user หรือ admin
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "banned"], // สถานะบัญชี
            default: "active",
        },
    },
    { timestamps: true }
);

// 🔒 Hash Password ก่อนบันทึกลง Database
UserSchema.pre("save", async function (next) {
    try {
        // ✅ เช็คว่า password ถูกเปลี่ยนจริงๆ หรือเป็น user ใหม่
        if (!this.isModified("password")) return next();

        // ✅ สร้าง Salt และ Hash Password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (error) {
        next(error); // ✅ ส่ง error ไปยัง middleware ของ mongoose
    }
});

// 🔑 Method ตรวจสอบรหัสผ่าน
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
