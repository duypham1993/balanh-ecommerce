import express from "express";
import { verifyTokenAdmin, verifyTokenClient } from "../middleware/verifyToken.js";
import { addToCart, getAllCart, getUserCart, updateCart, removeProductCart, deleteCart } from "../controllers/cartController.js";

const router = express.Router();

// GETALL
router.get("/", verifyTokenAdmin, getAllCart);


// CLIENT
// GET
router.get("/:id", verifyTokenClient, getUserCart);

// UPDATE/ADD PRODUCT TO CART
router.post("/add", verifyTokenClient, addToCart);

// UPDATE/REMOVE PRODUCT CART 
router.put("/remove", verifyTokenClient, removeProductCart);

// UPDATE
router.put("/", verifyTokenClient, updateCart);

// DELETE
router.delete("/:id", verifyTokenClient, deleteCart)

export default router;