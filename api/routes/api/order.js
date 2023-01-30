import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin, verifyTokenClient } from "../../middleware/verifyToken";
import { createOrder, getAllOrders, getUserOrders, updateOrder, deleteOrder, getCurrentOrder } from "../../controllers/orderController";

const router = express.Router();

//CREATE
router.post("/", verifyTokenRoleAdmin, createOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAdmin, getUserOrders);

//GET ALL
router.get("/", verifyTokenAdmin, getAllOrders);

//GET CURRENT ORDER
router.get("/:id", verifyTokenRoleAdmin, getCurrentOrder);

//UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteOrder);

// CLIENT
//CREATE
router.post("/client", verifyTokenClient, createOrder);

//GET USER ORDERS
router.get("/client/:userId", verifyTokenClient, getUserOrders);

//GET CURRENT ORDER
router.get("/client/current/:id", verifyTokenClient, getCurrentOrder);

module.exports = router;