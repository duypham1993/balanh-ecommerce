import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    costPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    categories: [{ type: ObjectId, required: true }],
    origin: { type: ObjectId, required: true },
    supplier: { type: ObjectId, required: true },
    qty: { type: Number, default: 0 },
    packing: { type: String, required: true },
    imgs: [String],
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
export default mongoose.model("Product", productSchema);