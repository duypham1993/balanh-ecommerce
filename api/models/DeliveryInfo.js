import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const deliveryInfoSchema = new mongoose.Schema(
  {
    customerId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      wards: { type: String, required: true },
      street: { type: String, required: true }
    },
    phone: { type: String, required: true },
    other: { type: String }
  },
  { timestamps: true }
)
module.exports = mongoose.model("DeliveryInfo", deliveryInfoSchema);