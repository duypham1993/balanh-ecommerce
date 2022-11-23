import Cart from "../models/Cart";

// CREATE
const createCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const saveCart = await cart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET
const getCurrentCart = async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  try {
    res.status(201).json(cart._doc);
  } catch (err) {
    res.status(501).json(err);
  }
};

// GETALL
const getAllCart = async (req, res) => {
  const carts = await Cart.find({});
  try {
    res.status(201).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.id);
    res.status(200).json("Xoá thành công!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createCart,
  getAllCart,
  getCurrentCart,
  updateCart,
  deleteCart
};