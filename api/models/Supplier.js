import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      wards: { type: String, required: true },
      street: { type: String },
    },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Supplier", supplierSchema);