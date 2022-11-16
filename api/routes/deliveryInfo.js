import express from "express";
import DeliveryInfo from "../models/DeliveryInfo";
import Customer from "../models/Customer";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// CREATE
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const [id] = await Customer.find({ email: req.body.email }, "_id");
    const newAddress = new DeliveryInfo({
      customerId: id._id,
      alias: req.body.alias,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      other: req.body.other
    });
    const saveAddress = await newAddress.save();
    res.status(201).json(saveAddress);
  } catch (error) {
    res.status(501).json(error);
  }
});

// GET ALL 
router.get("/", verifyToken, async (req, res) => {
  const addressList = await DeliveryInfo.find({});
  try {
    res.status(200).json(addressList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CURRENT ADDRESS
router.get("/:id", verifyToken, async (req, res) => {
  try {
    let currentAddress = await DeliveryInfo.findById(req.params.id);
    const { email } = await Customer.findById(currentAddress.customerId);
    currentAddress = { ...currentAddress._doc, email: email };
    res.status(200).json(currentAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const updateAddress = await DeliveryInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          alias: req.body.alias,
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          other: req.body.other
        }
      },
      { new: true }
    );
    res.status(200).json(updateAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await DeliveryInfo.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;