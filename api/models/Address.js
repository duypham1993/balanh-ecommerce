import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    customerID: { type: ObjectId, required: true },
    name: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      wards: { type: String, required: true },
      street: { type: String, required: true }
    },
    phone: { type: String, required: true },
    note: { type: String },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Address", addressSchema);