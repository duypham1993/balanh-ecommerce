import express from "express";
import { verifyTokenAdmin, verifyTokenRoleAdmin, verifyTokenClient } from "../middleware/verifyToken.js";
import { createAddress, getAllAddresss, getCurrentAddress, updateAddress, deleteAddress, getUserAddress } from "../controllers/addressController.js"

const router = express.Router();

// ADMIN
// CREATE
router.post("/", verifyTokenRoleAdmin, createAddress);

// GET ALL 
router.get("/", verifyTokenAdmin, getAllAddresss);

// GET CURRENT ADDRESS
router.get("/:id", verifyTokenRoleAdmin, getCurrentAddress);

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, updateAddress);

// DELETE
router.delete("/:id", verifyTokenRoleAdmin, deleteAddress);


// CLIENT
// CREATE
router.post("/client/", verifyTokenClient, createAddress);

// GET USER DELIVERY INFO
router.get("/client/:id", verifyTokenClient, getUserAddress);

//  UPDATE
router.put("/client/:id", verifyTokenClient, updateAddress);

// DELETE
router.delete("/client/:id", verifyTokenClient, deleteAddress);


export default router;