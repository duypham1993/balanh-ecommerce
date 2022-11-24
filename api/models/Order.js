import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerID: { type: ObjectId, required: true },
    products: [
      {
        productID: { type: ObjectId, required: true },
        qty: { type: Number, default: 1, required: true },
        costPrice: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    amount: { type: Number, required: true },
    address: {
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
    status: { type: String, default: "Đơn hàng đã đặt" },
    note: { type: String }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Order", orderSchema);