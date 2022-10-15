import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerID: { type: String, required: true },
    products: [
      {
        productID: { type: String },
        qty: { type: Number, default: 1 }
      }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Order", orderSchema);