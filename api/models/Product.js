import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    SKU: { type: String, required: true, unique: true },
    costPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    categories: { type: Array, required: true },
    origin: { type: String, required: true },
    supplier: { type: String, required: true },
    qty: { type: Number, default: 0 },
    weight: { type: String, required: true },
    imgs: { type: String },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Product", productSchema);