import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createCategory, getAllCategories, updateCategory, deleteCategory, checkSlug } from "../../controllers/categoryController";

const router = express.Router();

// CREATE
router.post("/", verifyTokenRoleAdmin, createCategory);

// GET ALL
router.get("/", verifyTokenAdmin, getAllCategories);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateCategory);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteCategory);

// CHECK SLUG 
router.post("/check", verifyTokenRoleAdmin, checkSlug);

// CLIENT
// GET ALL
router.get("/client", getAllCategories);

module.exports = router;