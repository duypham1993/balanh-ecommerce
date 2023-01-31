import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    role: { type: String, required: true },
    refreshToken: { type: Array }
  },
  { timestamps: true }
)

export default mongoose.model("Admin", adminSchema);