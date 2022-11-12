import express from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/Admin";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREAT
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const newUser = new Admin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
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
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;