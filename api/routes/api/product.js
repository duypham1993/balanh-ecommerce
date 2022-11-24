import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createProduct, getAllProducts, getCurrentProduct, updateProduct, updateStock, deleteProduct } from "../../controllers/productController";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, createProduct);

// GET CURRENT PRODUCT
router.get("/:id", verifyToken, getCurrentProduct);

// GET ALL
router.get("/", verifyToken, getAllProducts);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateProduct);

// UPDATE STOCK
router.put("/stock/:id", verifyToken, updateStock);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteProduct);

module.exports = router;