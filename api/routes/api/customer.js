import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin, verifyTokenClient } from "../../middleware/verifyToken";
import { createCustomer, getAllCustomers, getCurrentCustomer, updateCustomer, deleteCustomer, updateUser } from "../../controllers/customerController";

const router = express.Router();

// CREATE
router.post("/", verifyTokenRoleAdmin, createCustomer);

// GET ALL 
router.get("/", verifyTokenAdmin, getAllCustomers);

// GET CURRENT CUSTOMER
router.get("/:id", verifyTokenRoleAdmin, getCurrentCustomer);

// UPDATE
router.put("/", verifyTokenRoleAdmin, updateCustomer);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteCustomer);

// CLIENT
// UDPATE 
router.put("/client/", verifyTokenClient, updateUser)

module.exports = router;