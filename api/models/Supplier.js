import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: Object, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Supplier", supplierSchema);