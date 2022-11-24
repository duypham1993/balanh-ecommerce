import Product from "../models/Product";
import Origin from "../models/Origin";
import Supplier from "../models/Supplier";
import Category from "../models/Category";

// CREATE
const createProduct = async (req, res) => {
  let error = {};
  const checkSku = await Product.find({ sku: req.body.sku });
  if (checkSku?.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      const product = new Product(req.body);
      const saveProduct = await product.save();
      res.status(201).json(saveProduct);
    } catch {
      error.other = "Tạo sản phẩm thất bại!"
      res.status(500).json(error);
    }
  }
};

// GET CURRENT PRODUCT
const getCurrentProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const origin = await Origin.findById(product.origin, "_id name");
    const supplier = await Supplier.findById(product.supplier, "_id name");
    const updateProduct = {
      ...product._doc,
      origin: origin,
      supplier: supplier
    };

    res.status(201).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const updateProducts = products?.length ? await Promise.all(products.map(async (product) => {
      const updateInfo = {
        ...product._doc,
        categories: await Promise.all(product.categories.map(id => Category.findById(id, "_id name"))),
        origin: await Origin.findById(product.origin, "_id name"),
        supplier: await Supplier.findById(product.supplier, "_id name")
      };
      return updateInfo
    })) : [];

    return res.status(201).json(updateProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  let error = {};
  const checkSku = await Product.find({ sku: req.body.sku, _id: { $ne: req.params.id } });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(201).json(product);
    } catch {
      error.other = "Cập nhật sản phẩm thất bại!"
      res.status(500).json(error);
    }
  }
};

// UPDATE STOCK
const updateStock = async (req, res) => {
  let error = {};
  try {
    const updateProduct = await Product.findById(req.params.id);
    updateProduct.qty += isNaN(parseInt(req.body.qty)) ? 0 : parseInt(req.body.qty);
    if (updateProduct.qty < 0) updateProduct.qty = 0;
    await updateProduct.save();
    res.status(201).json({ _id: updateProduct._id, qty: updateProduct.qty });
  } catch {
    error.other = "Cập nhật số lượng thất bại!";
    res.status(500).json(error);
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  let error = {};
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json(req.params.id);
  } catch {
    error.other = "Xoá sản phẩm thất bại!"
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getCurrentProduct,
  updateProduct,
  updateStock,
  deleteProduct
};