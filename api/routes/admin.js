import express from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/Admin";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREAT
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
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
});

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await Admin.find({}, '_id email firstName lastName role isActive');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CURRENT ADMIN 
router.get("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id, '_id email firstName lastName role isActive');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
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

});


// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  let error = {};
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch {
    error.other = "Xoá quản trị viên thất bại!";
    res.status(500).json(error);
  }
});
module.exports = router;