import express from "express";
import Product from "../models/Product";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  const checkSku = await Product.find({ sku: req.body.sku });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error);
  } else {
    const product = new Product(req.body);
    try {
      const saveProduct = await product.save();
      res.status(201).json(saveProduct);
    } catch {
      error.other = "Tạo sản phẩm thất bại!"
      res.status(500).json(error);
    }
  }
});

// GET CURRENT PRODUCT
router.get("/:id", verifyToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    res.status(201).json(product);
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
  let error = {};
  const checkSku = await Product.find({ sku: req.body.sku, _id: { $ne: req.params.id } });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(201).json(product);
    } catch {
      error.other = "Cập nhật sản phẩm thất bại!"
      res.status(500).json(error);
    }
  }

});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json(req.params.id);
  } catch {
    error.other = "Xoá sản phẩm thất bại!"
    res.status(500).json(error);
  }
})
module.exports = router;