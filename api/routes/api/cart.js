import express from "express";
import { verifyToken, verifyTokenAndAuthorization } from "../../middleware/verifyToken";
import { createCart, getAllCart, getCurrentCart, updateCart, deleteCart } from "../../controllers/cartController";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenAndAuthorization, createCart);

// GET
router.get("/:id", verifyTokenAndAuthorization, getCurrentCart);

// GETALL
router.get("/all-cart", verifyToken, getAllCart);

// UPDATE
router.put("/update", verifyTokenAndAuthorization, updateCart);

// DELETE
router.delete("/delete", verifyTokenAndAuthorization, deleteCart);

module.exports = router;