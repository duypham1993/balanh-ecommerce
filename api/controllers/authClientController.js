import Customer from "../models/Customer";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

/*
 * FOR CLIENT 
 */
// Register 
const registerClient = async (req, res) => {
  const newCustomer = new Customer({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
  });
  try {
    const saveCustomer = await newCustomer.save();
    res.status(201).json(saveCustomer);
  } catch (error) {
    res.status(501).json(error);
  }
};

// Login
const loginClient = async (req, res) => {
  try {
    const customer = await Customer.findOne({ username: req.body.username });
    if (!customer) return res.status(401).json("Tài khoản hoặc mật khẩu không đúng");

    const decryptPass = CryptoJS.AES.decrypt(customer.password, process.env.PASS_KEY);
    const originalPass = decryptPass.toString(CryptoJS.enc.Utf8);
    if (originalPass !== req.body.password) return res.status(401).json("Tài khoản hoặc mật khẩu không đúng");
    if (!customer.isActive) return res.status(401).json("Tài khoản tạm thời không đăng nhập được. Vui lòng liên hệ CSKH!");

    const accessToken = jwt.sign(
      {
        id: customer._id,
        isActive: customer.isActive
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    const { password, ...other } = customer._doc;
    res.status(201).json({ ...other, token });
  } catch (err) {
    res.status(501).json(err)
  }
};

module.exports = {
  registerClient,
  loginClient
};