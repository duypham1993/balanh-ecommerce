import express from "express";
import Cart from "../models/Cart";
import { verifyToken, verifyTokenAndAuthorization } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const saveCart = await cart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  try {
    res.status(201).json(cart._doc);
  } catch (err) {
    res.status(501).json(err);
  }
});

// GETALL
router.get("/all-cart", verifyToken, async (req, res) => {
  const carts = await Cart.find({});
  try {
    res.status(201).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/update", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.id);
    res.status(200).json("Xoá thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;