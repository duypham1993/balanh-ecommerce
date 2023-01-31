import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    codeOrder: { type: String, required: true, unique: true },
    customerID: { type: ObjectId, required: true },
    products: [
      {
        _id: { type: ObjectId, required: true },
        name: { type: String, required: true },
        qty: { type: Number, default: 1, required: true },
        costPrice: { type: Number, required: true },
        price: { type: Number, required: true },
        packing: { type: String, required: true }
      }
    ],
    shippingFee: { type: Number, required: true },
    amount: { type: Number, required: true },
    address: {
      _id: { type: ObjectId, required: true },
      name: { type: String, required: true },
      address: {
        city: { type: String, required: true },
        district: { type: String, required: true },
        wards: { type: String, required: true },
        street: { type: String, required: true }
      },
      phone: { type: String, required: true },
      note: { type: String }
    },
    status: [{
      title: { type: String },
      time: { type: Date }
    }],
    note: { type: String }
  },
  { timestamps: true }
)
export default mongoose.model("Order", orderSchema);