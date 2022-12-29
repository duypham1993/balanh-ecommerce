import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createSupplier, getAllSuppliers, getCurrentSupplier, updateSupplier, deleteSupplier } from "../../controllers/supplierController";

const router = express.Router();

// CREATE 
router.post("/", verifyTokenRoleAdmin, createSupplier);

// GET ALL 
router.get("/", verifyTokenAdmin, getAllSuppliers);

// GET CURRENT SUPPLIER
router.get("/:id", verifyTokenRoleAdmin, getCurrentSupplier);

// UPDATE
router.put("/", verifyTokenRoleAdmin, updateSupplier);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteSupplier);

module.exports = router;