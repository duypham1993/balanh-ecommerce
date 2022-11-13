import express from "express";
import CryptoJS from "crypto-js";
import Customer from "../models/Customer";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const newUser = new Customer({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
    phone: req.body.phone,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
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
  const user = await Customer.find({});
  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
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
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;