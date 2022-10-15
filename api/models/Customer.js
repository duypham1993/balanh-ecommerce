import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    address: { type: Object }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Customer", customerSchema);