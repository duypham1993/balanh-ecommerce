import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createOrigin, getAllOrigins, updateOrigin, deleteOrigin } from "../../controllers/originController";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, createOrigin);

// GET ALL
router.get("/", verifyToken, getAllOrigins);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateOrigin);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteOrigin);

module.exports = router;