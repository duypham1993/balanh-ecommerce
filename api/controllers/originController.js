import Origin from "../models/Origin";

// CREATE
const createOrigin = async (req, res) => {
  let error = {};
  const checkOrigin = await Origin.findOne({ name: req.body.name });

  if (checkOrigin) {
    error.name = "Địa chỉ đã tồn tại!";
    return res.status(500).json(error);
  }

  try {
    const origin = new Origin({
      name: req.body.name,
    });
    const saveOrigin = await origin.save();
    return res.status(200).json(saveOrigin);
  } catch {
    error.other = "Tạo địa chỉ thất bại!"
    return res.status(500).json(error);
  }
};

// GET ALL
const getAllOrigins = async (req, res) => {
  const origin = await Origin.find();
  try {
    return res.status(200).json(origin);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// UPDATE
const updateOrigin = async (req, res) => {
  try {
    const updateOrigin = await Origin.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name
        }
      },
      { new: true }
    );
    return res.status(200).json(updateOrigin);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE
const deleteOrigin = async (req, res) => {
  try {
    await Origin.findByIdAndDelete(req.params.id);
    return res.status(200).json(req.params.id);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createOrigin,
  getAllOrigins,
  updateOrigin,
  deleteOrigin
};