import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createAdmin, getAllAdmin, getCurrentAdmin, updateAdmin, updateByCurrentUser, deleteAdmin } from "../../controllers/adminController"

const router = express.Router();

// CREAT
router.post("/", verifyTokenRoleAdmin, createAdmin);

// GET ALL 
router.get("/", verifyTokenAdmin, getAllAdmin);

// GET CURRENT ADMIN
router.get("/:id", verifyTokenRoleAdmin, getCurrentAdmin);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateAdmin);

// UPDATE BY CURRENT USER 
router.put("/user/", verifyTokenAdmin, updateByCurrentUser);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteAdmin);

module.exports = router;