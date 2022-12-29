import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    customerID: { type: ObjectId, required: true, unique: true },
    products: [
      {
        _id: { type: ObjectId },
        qty: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model("Cart", cartSchema);