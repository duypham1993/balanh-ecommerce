import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    parent: { type: String, default: null },
    ancestors: [
      {
        id: { type: String },
        name: { type: String },
        slug: { type: String },
      }
    ],
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Category", categorySchema);