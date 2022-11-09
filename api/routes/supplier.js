import express from "express";
import Supplier from "../models/Supplier";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE 
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const supplier = new Supplier(req.body);
  try {
    const saveSupplier = await supplier.save();
    res.status(200).json(saveSupplier);
  } catch (err) {
    res.status(500).json(err);
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
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;