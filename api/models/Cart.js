import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    customerID: { type: ObjectId, required: true },
    products: [
      {
        productID: { type: ObjectId, required: true },
        qty: { type: Number, default: 1, required: true }
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model("Cart", cartSchema);