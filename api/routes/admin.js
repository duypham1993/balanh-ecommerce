import express from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/Admin";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREAT
router.post("/add-user", verifyTokenRoleAdmin, async (req, res) => {
  const newUser = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
    role: req.body.role,
    isActive: req.body.isActive
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(501).json(error);
  }
});

// GET USER
router.get("/detail", verifyToken, async (req, res) => {
  try {
    const user = await Admin.findById(req.body.id);
    res.status(201).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER
router.get("/listuser", verifyToken, async (req, res) => {
  const user = await Admin.find({});
  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
  }
  try {
    const updateUser = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE
router.delete("/delete", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.body.id);
    res.status(200).json("Đã xoá thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;