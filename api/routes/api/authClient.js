import express from "express";
import { registerClient, loginClient } from "../../controllers/authClientController";

const router = express.Router();

/*
 * FOR CLIENT 
 */
// Register 
router.post("/register", registerClient);

// Login
router.post("/login", loginClient);

module.exports = router;