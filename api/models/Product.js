import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: Array, required: true },
    qty: { type: Number, default: 0 },
    weight: { type: String, required: true },
    img: { type: String },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Product", productSchema);