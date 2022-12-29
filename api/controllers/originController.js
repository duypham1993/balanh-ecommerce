import Origin from "../models/Origin";

// CREATE
const createOrigin = async (req, res) => {
  const origin = new Origin({
    name: req.body.name,
  });
  try {
    const saveOrigin = await origin.save();
    res.status(200).json(saveOrigin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL
const getAllOrigins = async (req, res) => {
  const origin = await Origin.find();
  try {
    res.status(200).json(origin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updateOrigin = async (req, res) => {
  try {
    const updateOrigin = await Origin.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrigin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteOrigin = async (req, res) => {
  try {
    await Origin.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrigin,
  getAllOrigins,
  updateOrigin,
  deleteOrigin
};