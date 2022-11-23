import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../../controllers/categoryController";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, createCategory);

// GET ALL
router.get("/", verifyToken, getAllCategories);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateCategory);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteCategory);

module.exports = router;