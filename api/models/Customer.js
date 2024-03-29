import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    phone: { type: String },
    dateOfBirth: { type: Date },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
    isActive: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },
    refreshToken: [String]
  },
  { timestamps: true }
)
export default mongoose.model("Customer", customerSchema);