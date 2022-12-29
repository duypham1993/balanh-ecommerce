import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createOrigin, getAllOrigins, updateOrigin, deleteOrigin } from "../../controllers/originController";

const router = express.Router();

// CREATE
router.post("/", verifyTokenRoleAdmin, createOrigin);

// GET ALL
router.get("/", verifyTokenAdmin, getAllOrigins);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateOrigin);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteOrigin);

module.exports = router;