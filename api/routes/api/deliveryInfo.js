import express from "express";
import { verifyToken, verifyTokenRoleAdmin } from "../../middleware/verifyToken";
import { createDeliveryInfo, getAllDeliveryInfos, getCurrentDeliveryInfo, updateDeliveryInfo, deleteDeliveryInfo } from "../../controllers/deliveryInfoController"

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, createDeliveryInfo);

// GET ALL 
router.get("/", verifyToken, getAllDeliveryInfos);

// GET CURRENT ADDRESS
router.get("/:id", verifyToken, getCurrentDeliveryInfo);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateDeliveryInfo);

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, deleteDeliveryInfo);

module.exports = router;