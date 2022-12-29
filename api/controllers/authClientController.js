import Customer from "../models/Customer";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

/*
 * FOR CLIENT 
 */
// Register 
const registerClient = async (req, res) => {
  let errors = {};
  const checkEmail = await Customer.findOne({ email: req.body.email });
  if (checkEmail) {
    errors.email = "Email đã được đăng kí!"
    return res.status(500).json(errors);
  }

  try {
    const newCustomer = new Customer({
      ...req.body,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    });
    await newCustomer.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(501).json(error);
  }
};

// Login
const loginClient = async (req, res) => {
  let error = {};
  try {
    const cookies = req.cookies;
    const user = await Customer.findOne({ email: req.body.email });

    if (!user) {
      error.email = "Email không tồn tại!";
      return res.status(401).json(error);
    }

    const decryptPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const originalPass = decryptPass.toString(CryptoJS.enc.Utf8);

    if (originalPass !== req.body.password) {
      error.password = "Mật khẩu không đúng!";
      return res.status(401).json(error);
    }
    if (!user.isActive) {
      error.email = "Tài khoản đã bị khoá!"
      return res.status(401).json(error);
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        isActive: user.isActive,
      },
      process.env.JWT_KEY_CLIENT,
      { expiresIn: "15m" }
    );

    if (req.body.rememberMe) {
      const newRefreshToken = jwt.sign(
        {
          _id: user._id,
          isActive: user.isActive
        },
        process.env.REFRESH_TOKEN_KEY_CLIENT
      );

      let newRefreshTokenArr = !cookies?.jwtClient ? user.refreshToken : user.refreshToken.filter(item => item !== cookies.jwtClient);

      if (cookies?.jwtClient) {
        const refreshToken = cookies.jwtClient;
        const foundToken = await Customer.findOne({ refreshToken }).exec();

        if (!foundToken) {
          newRefreshTokenArr = [];
        }

        res.clearCookie('jwtClient', { httpOnly: true, sameSite: 'None', secure: true });
      }

      // Save refreshToken with current user
      user.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      await user.save();

      // Creates Secure Cookie with refresh accessToken
      res.cookie('jwtClient', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    } else {
      if (cookies?.jwtClient) {
        res.clearCookie('jwtClient', { httpOnly: true, sameSite: 'None', secure: true });
      }
    }

    const currentUser = {
      _id: user._doc._id,
      email: user._doc.email,
      name: user._doc.name,
      phone: user._doc.phone,
      dateOfBirth: user._doc.dateOfBirth,
      gender: user._doc.gender,
      isActive: user._doc.isActive
    }

    res.status(201).json({ currentUser, accessToken });
  } catch {
    error.other = "Không thể đăng nhập, vui lòng thử lại!"
    res.status(501).json(error)
  }
};

const logoutClient = async (req, res) => {
  let error = {};
  try {
    const cookies = req.cookies;
    if (!cookies?.jwtClient) return res.sendStatus(204);
    const refreshToken = cookies.jwtClient;

    const user = await Customer.findOne({ refreshToken: refreshToken }).exec();

    if (!user) {
      res.clearCookie('jwtClient', { httpOnly: true, secure: true, sameSite: 'None' })
      return res.sendStatus(204);
    }

    user.refreshToken = user.refreshToken.filter(item => item !== refreshToken);
    user.save();
    res.clearCookie('jwtClient', { httpOnly: true, secure: true, sameSite: "None" });
    return res.sendStatus(204);
  } catch {
    error.other = "Đăng xuất thất bại!"
    res.status(201).json(error);
  }
};
module.exports = {
  registerClient,
  loginClient,
  logoutClient
};