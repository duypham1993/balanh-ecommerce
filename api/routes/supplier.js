import express from "express";
import Supplier from "../models/Supplier";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// GET
router.get("/get:id", verifyToken, async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  try {
    res.status(200).json(supplier._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
  const supplier = await Supplier.find({});
  try {
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const updateSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateSupplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Supplier.findOneAndDelete(req.body.id);
    res.status(200).json("Đã xoá thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;