import Cart from "../models/Cart";

// CREATE
const createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const saveCart = await cart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET CURRENT CART
const getCurrentCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(201).json(cart._doc);
  } catch (err) {
    res.status(501).json(err);
  }
};

// GET ALL
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(201).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updateCart = async (req, res) => {
  let error = {};
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateCart);
  } catch {
    error.other = "Cập nhật giỏ hàng thất bại!"
    res.status(500).json(error);
  }
};

// DELETE
const deleteCart = async (req, res) => {
  let error = {};
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch {
    error.other = "Xoá giỏ hàng thất bại!"
    res.status(500).json(error);
  }
};

module.exports = {
  createCart,
  getAllCart,
  getCurrentCart,
  updateCart,
  deleteCart
};