import CryptoJS from "crypto-js";
import Customer from "../models/Customer";

// CREATE
const createCustomer = async (req, res) => {
  let error = {};
  const checkEmail = await Customer.find({ email: req.body.email });
  if (checkEmail && checkEmail.length) {
    error.email = "Email đã được đăng kí!"
    res.status(500).json(error);
  } else {
    try {
      const newUser = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
        phone: req.body.phone,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        isActive: req.body.isActive
      });
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch {
      error.other = "Tạo tài khoản thất bại!"
      res.status(501).json(error);
    }
  }
};

// GET ALL 
const getAllCustomers = async (req, res) => {
  const user = await Customer.find({}, "_id name email gender phone dateOfBirth isActive");
  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET CURRENT CUSTOMER
const getCurrentCustomer = async (req, res) => {
  const currentUser = await Customer.findById(req.params.id, "_id name email gender phone dateOfBirth isActive");
  try {
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
const updateCustomer = async (req, res) => {
  let error = {};
  const checkEmail = Customer.find({ email: req.body.email, _id: { $ne: req.params.id } });
  if (checkEmail && checkEmail.length) {
    error.email = "Email đã được đăng kí!";
    res.status(500).json(error);
  } else {
    try {
      let updateUser = {};
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
        updateUser = await Customer.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
      } else {
        updateUser = await Customer.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              gender: req.body.gender,
              dateOfBirth: req.body.dateOfBirth,
              isActive: req.body.isActive
            }
          },
          { new: true }
        );
      }

      res.status(200).json(updateUser);
    } catch {
      error.other = "Cập nhật tài khoản thất bại!"
      res.status(500).json(error);
    }
  }
};

const updateUser = async (req, res) => {
  let error = {};
  try {
    if (req.body.currentPassword) {
      const user = await Customer.findById(req.body._id);
      const currentPassword = user.password;
      const decryptPass = CryptoJS.AES.decrypt(currentPassword, process.env.PASS_KEY).toString(CryptoJS.enc.Utf8);

      if (decryptPass !== req.body.currentPassword) {
        error.password = "Mật khẩu không đúng!";
        return res.status(500).json(error);
      }

      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
      await Customer.findByIdAndUpdate(
        req.body._id,
        { $set: req.body },
        { new: true }
      );
    } else {
      await Customer.findByIdAndUpdate(
        req.body._id,
        {
          $set: {
            name: req.body.name,
            phone: req.body.phone,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
          }
        },
        { new: true }
      );
    }

    const updateUser = await Customer.findById(req.body._id, "name dateOfBirth phone email gender")

    res.status(200).json(updateUser);
  } catch {
    error.other = "Cập nhật tài khoản thất bại!"
    res.status(500).json(error);
  }
}

// DELETE
const deleteCustomer = async (req, res) => {
  let error = {}
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch {
    error.other = "Xoá tài khoản thất bại!"
    res.status(500).json(error);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCurrentCustomer,
  updateCustomer,
  deleteCustomer,
  updateUser
};