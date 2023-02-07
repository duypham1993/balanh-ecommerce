import express from "express";
import { registerClient, loginClient, logoutClient, verifyEmail, forgotPassword, resetPassword, checkLinkResetPW } from "../controllers/authClientController.js";

const router = express.Router();

/*
 * FOR CLIENT 
 */
// Register 
router.post("/register", registerClient);

// Verify
router.put("/verify/:id/:token", verifyEmail);

// Login
router.post("/login", loginClient);

// Send Link Reset Password
router.post("/forgot-password", forgotPassword);

// Check Link Reset Passowrd
router.get("/check-link/:id/:token", checkLinkResetPW);

// Reset Password 
router.put("/reset/:id/:token", resetPassword);

// Logout
router.delete("/logout", logoutClient);

export default router;