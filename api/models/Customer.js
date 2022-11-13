import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: String },
    isActive: { type: Boolean, default: false },
    deliveryInfo: [
      {
        _id: { type: ObjectId, unique: true },
        alias: { type: String },
        name: { type: String },
        address: { type: Object },
        phone: { type: String },
        other: { type: String }
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model("Customer", customerSchema);