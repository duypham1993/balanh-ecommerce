import express from "express";
import Category from "../models/Category";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {

  const category = new Category({
    name: req.body.name,
    desc: req.body.desc,
    slug: req.body.slug,
    img: req.body.img,
    isActive: req.body.isActive,
    parentId: req.body.parentId,
  });
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
  let root = {};

  if (categories.length > 0) {
    const idMapping = categories.reduce((acc, el, i) => {
      acc[el._id] = i;
      return acc;
    }, {});

    categories.forEach(el => {
      // Handle the root element
      if (!el.parentId) {
        root = el._doc;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = categories[idMapping[el.parentId]]._doc;
      // Add our current el to its parent's `children` array
      parentEl.children = [...(parentEl.children || []), el];
    });
  }

  try {
    res.status(201).json([categories, root]);
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
    const root = await Category.findOne({ parentId: "" });
    await Category.deleteMany({ parentId: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
    res.status(201).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;