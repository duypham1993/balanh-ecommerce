import express from "express";
import { verifyToken, verifyTokenAndAuthorization } from "../../middleware/verifyToken";
import { createOrder, getAllOrders, getUserOrders, getMonthyIncome, updateOrder, deleteOrder } from "../../controllers/orderController";

const router = express.Router();

//CREATE
router.post("/", verifyTokenAndAuthorization, createOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);

// //GET ALL
router.get("/", verifyToken, getAllOrders);

// GET MONTHLY INCOME
router.get("/income", verifyToken, getMonthyIncome);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);

module.exports = router;