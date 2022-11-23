import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createAdmin, getAllAdmin, getCurrentAdmin, updateAdmin, updateByCurrentUser, deleteAdmin } from "../../controllers/adminController"

const router = express.Router();

// CREAT
router.post("/create", verifyTokenRoleAdmin, createAdmin);

// GET ALL 
router.get("/", verifyToken, getAllAdmin);

// GET CURRENT ADMIN 
router.get("/:id", verifyTokenRoleAdmin, getCurrentAdmin);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateAdmin);

// UPDATE BY CURRENT USER 
router.put("/user/:id", updateByCurrentUser);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteAdmin);

module.exports = router;