import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userID: { type: ObjectId, required: true },
    token: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model("Token", tokenSchema);