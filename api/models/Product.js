import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    costPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    categories: { type: Array },
    origin: { type: String, required: true },
    supplier: { type: String, required: true },
    qty: { type: Number, default: 0 },
    packing: { type: String, required: true },
    imgs: { type: Array },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Product", productSchema);