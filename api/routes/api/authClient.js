import express from "express";
import { registerClient, loginClient, logoutClient } from "../../controllers/authClientController";

const router = express.Router();

/*
 * FOR CLIENT 
 */
// Register 
router.post("/register", registerClient);

// Login
router.post("/login", loginClient);

// Logout
router.delete("/logout", logoutClient);

module.exports = router;