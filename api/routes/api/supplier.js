import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createSupplier, getAllSuppliers, getCurrentSupplier, updateSupplier, deleteSupplier } from "../../controllers/supplierController";

const router = express.Router();

// CREATE 
router.post("/create", verifyTokenRoleAdmin, createSupplier);

// GET ALL 
router.get("/", verifyToken, getAllSuppliers);

// GET CURRENT SUPPLIER
router.get("/:id", verifyTokenRoleAdmin, getCurrentSupplier);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateSupplier);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteSupplier);

module.exports = router;