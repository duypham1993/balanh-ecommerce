import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    phone: { type: String },
    dateOfBirth: { type: String },
    isActive: { type: Boolean, default: false },
    refreshToken: [String]
  },
  { timestamps: true }
)
module.exports = mongoose.model("Customer", customerSchema);