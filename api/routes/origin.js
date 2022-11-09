import express from "express";
import Origin from "../models/Origin";
import { verifyToken, verifyTokenRoleAdmin } from "./verifyToken";

const router = express.Router();

// create
router.post("/create", verifyTokenRoleAdmin, async (req, res) => {
  const origin = new Origin({
    name: req.body.name,
  });
  try {
    const saveOrigin = await origin.save();
    res.status(200).json(saveOrigin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/", verifyToken, async (req, res) => {
  const origin = await Origin.find();
  try {
    res.status(200).json(origin);
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE
router.put("/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    const updateOrigin = await Origin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrigin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenRoleAdmin, async (req, res) => {
  try {
    await Origin.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;