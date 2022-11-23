import CryptoJS from "crypto-js";
import Admin from "../models/Admin";

// CREAT
const createAdmin = async (req, res) => {
  let error = {};
  const checkEmail = await Admin.find({ email: req.body.email });
  if (checkEmail && checkEmail.length) {
    error.email = "Email đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      const newUser = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
        role: req.body.role,
        isActive: req.body.isActive
      });
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch {
      error.other = "Tạo quản trị viên thất bại!"
      res.status(501).json(error);
    }
  }
};

// GET ALL 
const getAllAdmin = async (req, res) => {
  try {
    const user = await Admin.find({}, '_id email firstName lastName role isActive');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET CURRENT ADMIN 
const getCurrentAdmin = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id, '_id email firstName lastName role isActive');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
};

// UPDATE
const updateAdmin = async (req, res) => {
  let error = {};
  const checkEmail = await Admin.find({ email: req.body.email, _id: { $ne: req.params.id } });
  if (checkEmail.length) {
    error.email = "Email đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      let updateUser = {};
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
        updateUser = await Admin.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
      } else {
        updateUser = await Admin.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              role: req.body.role,
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

// UPDATE BY CURRENT USER 
const updateByCurrentUser = async (req, res) => {
  let error = {};
  const statusChangePW = req.body.statusChangePW;
  try {
    let updateUser = {};

    if (statusChangePW) {
      const user = await Admin.findById(req.params.id);
      const password = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY).toString(CryptoJS.enc.Utf8);

      if (req.body.password === password) {
        const encryptPW = CryptoJS.AES.encrypt(req.body.newPW, process.env.PASS_KEY).toString();
        updateUser = await Admin.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              password: encryptPW
            }
          },
          { new: true }
        );
      } else {
        error.password = "Mật khẩu không đúng!"
        return res.status(402).json(error)
      }

    } else {
      updateUser = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          }
        },
        { new: true }
      );
    }
    const resUser = {
      _id: updateUser._id,
      lastName: updateUser.lastName,
      firstName: updateUser.firstName,
      email: updateUser.email,
      isActive: updateUser.isActive,
      role: updateUser.role
    }
    res.status(200).json(resUser);
  } catch {
    error.other = "Cập nhật tài khoản thất bại!"
    res.status(500).json(error);
  }
};

// DELETE
const deleteAdmin = async (req, res) => {
  let error = {};
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch {
    error.other = "Xoá quản trị viên thất bại!";
    res.status(500).json(error);
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getCurrentAdmin,
  updateAdmin,
  updateByCurrentUser,
  deleteAdmin
};