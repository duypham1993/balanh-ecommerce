import express from "express";
import Customer from "../models/Customer";
import { verifyToken, verifyTokenAndAuthorization } from "./verifyToken";

const router = express.Router();

// GET
router.get("/get:id", verifyToken, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const { password, ...others } = customer._doc;
  try {
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
  const customer = await Customer.find({});
  try {
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
  }
  try {
    const updateCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete", verifyToken, async (req, res) => {
  try {
    await Customer.findOneAndDelete(req.body.id);
    res.status(200).json("Đã xoá thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;