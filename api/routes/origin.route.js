import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../middleware/verifyToken.js";
import { createOrigin, getAllOrigins, updateOrigin, deleteOrigin } from "../controllers/originController.js";

const router = express.Router();

// CREATE
router.post("/", verifyTokenRoleAdmin, createOrigin);

// GET ALL
router.get("/", verifyTokenAdmin, getAllOrigins);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateOrigin);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteOrigin);

export default router;