import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    customerID: { type: String, required: true },
    products: [
      {
        productID: { type: String },
        qty: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model("Cart", cartSchema);