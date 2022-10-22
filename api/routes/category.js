import express from "express";
import Category from "../models/Category";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const category = new Category(req.body);
  try {
    const saveCategory = await category.save();
    res.status(201).json(saveCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  const categories = await Category.find();
  try {
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(201).json("Xoá danh mục thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;