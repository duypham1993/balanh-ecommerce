import express from "express";
import Product from "../models/Product";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const product = new Product(req.body);
  try {
    const saveProduct = await product.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET
router.get("/:id", verifyToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    res.status(201).json(product._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  const products = await Product.find();
  try {
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;