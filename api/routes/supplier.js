import express from "express";
import Supplier from "../models/Supplier";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE 
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  const checkSku = await Supplier.find({ sku: req.body.sku });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error)
  } else {
    const supplier = new Supplier(req.body);
    try {
      const saveSupplier = await supplier.save();
      res.status(200).json(saveSupplier);
    } catch {
      error.other = "Tạo nhà cung cấp thất bại!"
      res.status(500).json(error);
    }
  }
})

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
  const supplier = await Supplier.find({});
  try {
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CURRENT SUPPLIER
router.get("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json(error);
  }
})

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  const checkSku = await Supplier.find({ sku: req.body.sku, _id: { $ne: req.params.id } });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!"
    res.status(500).json(error);
  } else {
    try {
      const updateSupplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateSupplier);
    } catch {
      error.other = "Cập nhật nhà cung cấp thất bại!"
      res.status(500).json(error);
    }
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch {
    error.other = "Xoá nhà cung cấp thất bại!"
    res.status(500).json(error);
  }
});


module.exports = router;