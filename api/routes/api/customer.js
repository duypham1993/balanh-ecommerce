import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createCustomer, getAllCustomers, getCurrentCustomer, updateCustomer, deleteCustomer } from "../../controllers/customerController";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, createCustomer);

// GET ALL 
router.get("/", verifyToken, getAllCustomers);

// GET CURRENT CUSTOMER
router.get("/:id", verifyTokenRoleAdmin, getCurrentCustomer);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateCustomer);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteCustomer);

module.exports = router;