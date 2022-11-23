import express from "express";
import { loginAdmin, logoutAdmin } from "../../controllers/authAdminController";

const router = express.Router();

/*
 * FOR Admin 
 */
// Login
router.post("/login", loginAdmin);

// Logout
router.delete("/logout", logoutAdmin);

module.exports = router;