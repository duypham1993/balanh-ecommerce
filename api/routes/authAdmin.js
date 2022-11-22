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
  let error = {};
  try {
    const cookies = req.cookies;
    const user = await Admin.findOne({ email: req.body.email });

    if (!user) {
      error.validate = "Email hoặc mật khẩu không đúng!";
      return res.status(401).json(error);
    }

    const decryptPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const originalPass = decryptPass.toString(CryptoJS.enc.Utf8);

    if (originalPass !== req.body.password) {
      error.validate = "Email hoặc mật khẩu không đúng!";
      return res.status(401).json(error);
    }
    if (!user.isActive) {
      error.deactive = "Tài khoản đã bị khoá!"
      return res.status(401).json(error);
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        isActive: user.isActive,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        isActive: user.isActive
      },
      process.env.REFRESH_TOKEN_KEY
    );

    let newRefreshTokenArr = !cookies?.jwt ? user.refreshToken : user.refreshToken.filter(item => item !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await Admin.findOne({ refreshToken }).exec();

      if (!foundToken) {
        newRefreshTokenArr = [];
      }

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    // Save refreshToken with current user
    user.refreshToken = [...newRefreshTokenArr, newRefreshToken];
    await user.save();

    // Creates Secure Cookie with refresh accessToken
    res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })

    const currentUser = {
      _id: user._doc._id,
      email: user._doc.email,
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      role: user._doc.role,
      isActive: user._doc.isActive
    }

    res.status(201).json({ currentUser, accessToken });
  } catch {
    error.other = "Không thể đăng nhập, vui lòng thử lại!"
    res.status(501).json(error)
  }
});

module.exports = router;