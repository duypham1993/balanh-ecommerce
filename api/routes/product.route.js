import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../middleware/verifyToken.js";
import { createProduct, getAllProducts, getProductOfCategory, getCurrentProduct, updateProduct, updateStock, deleteProduct, getCurrentProductClient, getProductsForSearch, getFilterProduct, getProductForQuickSearch } from "../controllers/productController.js";

const router = express.Router();

// CREATE
router.post("/", verifyTokenRoleAdmin, createProduct);

// GET CURRENT PRODUCT
router.get("/:id", verifyTokenAdmin, getCurrentProduct);

// GET ALL
router.get("/", verifyTokenAdmin, getAllProducts);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateProduct);

// UPDATE STOCK
router.put("/stock/", verifyTokenAdmin, updateStock);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteProduct);

// CLIENT
// GET PRODUCT OF CATEGORY
router.get("/category/:id", getProductOfCategory);

// GET CURRENT PRODUCT
router.get("/client/detail/:id", getCurrentProductClient);

// GET PRODUCTS FOR FULL SEARCH
router.get("/client/search", getProductsForSearch);

// GET PRODUCTS FOR QUICK SEARCH 
router.get("/client/quickSearch", getProductForQuickSearch);

// GET FILTER FOR PRODUCT
router.get("/client/filters", getFilterProduct);

export default router;