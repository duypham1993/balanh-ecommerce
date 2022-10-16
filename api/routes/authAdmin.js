import express from "express";
import Admin from "../models/Admin";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

/*
 * FOR Admin 
 */
// Login
router.post("/login", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    !user && res.status(401).json("Tài khoản hoặc mật khẩu không đúng");

    const decryptPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const originalPass = decryptPass.toString(CryptoJS.enc.Utf8);

    originalPass !== req.body.password && res.status(401).json("Tài khoản hoặc mật khẩu không đúng");
    !user.isActive && res.status(401).json("Tài khoản bị khoá!");

    const token = await jwt.sign(
      {
        id: user._id,
        isActive: user.isActive,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    const { password, ...other } = user._doc;
    res.status(201).json({ ...other, token });
  } catch (err) {
    res.status(501).json(err)
  }
});

module.exports = router;