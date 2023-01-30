import Cart from "../models/Cart";
import Product from "../models/Product";
import { getInfoProductForCart } from "../utils/getInfoProductForCart";

// GET ALL
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(201).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  let error = {};
  const cart = await Cart.findOne({ customerID: req.params.id });
  // If user has cart - reponse cart else create and reponse cart
  if (cart) {
    try {
      const updateInfoCart = await getInfoProductForCart(cart);
      res.status(201).json(updateInfoCart);
    } catch {
      error.other = "Không tải dữ liệu giỏ hàng";
      res.status(501).json(error);
    }
  } else {
    try {
      const cart = new Cart({
        customerID: req.params.id,
        products: []
      });
      const saveCart = await cart.save();
      res.status(200).json(saveCart);
    } catch {
      error.other = "Tạo giỏ hàng thất bại!"
      res.status(500).json(error);
    }
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  let error = {};
  try {
    console.log(req.body);
    const filter = {
      customerID: req.body.customerID,
      "products._id": req.body.product._id
    };
    const check = await Cart.findOne(filter);

    // if cart has product - increase qty else add product and qty to cart
    if (check) {
      await Cart.findOneAndUpdate(filter, { $inc: { "products.$.qty": req.body.product.qty } }, { new: true });

      res.status(200).json(req.body.product);
    } else {
      await Cart.findOneAndUpdate(
        { customerID: req.body.customerID },
        { $push: { products: req.body.product } },
        { new: true }
      );

      const product = await Product.findById(req.body.product._id, "name price packing imgs");
      res.status(200).json({ ...product._doc, qty: req.body.product.qty });
    }
  } catch {
    error.other = "Cập nhật giỏ hàng thất bại!"
    res.status(500).json(error);
  }
}

// REMOVE PRODUCT IN CART 
const removeProductCart = async (req, res) => {
  let error = {};
  try {
    await Cart.findOneAndUpdate(
      { customerID: req.body.customerID },
      { $pull: { products: { _id: req.body.productID } } },
      { new: true }
    );

    return res.status(201).json(req.body.productID);
  } catch {
    error.other = "Xoá sản phẩm thất bại!"
    return res.status(500).json(error);
  }
}

// UPDATE CART
const updateCart = async (req, res) => {
  let error = {};

  try {
    const filter = {
      customerID: req.body.customerID,
      "products._id": req.body.product._id
    };

    await Cart.findOneAndUpdate(filter, { $set: { "products.$.qty": req.body.product.qty } }, { new: true });

    res.status(200).json(req.body.product);
  } catch {
    error.other = "Cập nhật giỏ hàng thất bại!"
    res.status(500).json(error);
  }
};

// DELETE CART  
const deleteCart = async (req, res) => {
  let error = {};
  try {
    await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { products: [] } }
    );
    res.sendStatus(204);
  } catch {
    error.other = "Xoá giỏ hàng thất bại!"
    res.status(500).json(error);
  }
}

module.exports = {
  addToCart,
  getAllCart,
  getUserCart,
  removeProductCart,
  updateCart,
  deleteCart
};