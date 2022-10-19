import mongoose from "mongoose";

const originSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Origin", originSchema);