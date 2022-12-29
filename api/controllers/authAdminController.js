import Admin from "../models/Admin";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

/*
 * FOR Admin 
 */
// Login
const loginAdmin = async (req, res) => {
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

    if (req.body.rememberMe) {
      const newRefreshToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
          isActive: user.isActive
        },
        process.env.REFRESH_TOKEN_KEY
      );

      let newRefreshTokenArr = !cookies?.jwtAdmin ? user.refreshToken : user.refreshToken.filter(item => item !== cookies.jwtAdmin);

      if (cookies?.jwtAdmin) {
        const refreshToken = cookies.jwtAdmin;
        const foundToken = await Admin.findOne({ refreshToken }).exec();

        if (!foundToken) {
          newRefreshTokenArr = [];
        }

        res.clearCookie('jwtAdmin', { httpOnly: true, sameSite: 'None', secure: true });
      }

      // Save refreshToken with current user
      user.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      await user.save();

      // Creates Secure Cookie with refresh accessToken
      res.cookie('jwtAdmin', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    } else {
      if (cookies?.jwtAdmin) {
        res.clearCookie('jwtAdmin', { httpOnly: true, sameSite: 'None', secure: true });
      }
    }

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
};

const logoutAdmin = async (req, res) => {
  let error = {};
  try {
    const cookies = req.cookies;
    if (!cookies?.jwtAdmin) return res.sendStatus(204);
    const refreshToken = cookies.jwtAdmin;

    const user = await Admin.findOne({ refreshToken: refreshToken }).exec();

    if (!user) {
      res.clearCookie('jwtAdmin', { httpOnly: true, secure: true, sameSite: 'None' })
      return res.sendStatus(204);
    }

    user.refreshToken = user.refreshToken.filter(item => item !== refreshToken);
    user.save();
    res.clearCookie('jwtAdmin', { httpOnly: true, secure: true, sameSite: "None" });
    return res.sendStatus(204);
  } catch {
    error.other = "Đăng xuất thất bại!"
    res.status(201).json(error);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin
};