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
  const checkSku = await Product.find({ sku: req.body.sku, _id: { $ne: req.body._id } });
  if (checkSku && checkSku.length) {
    error.sku = "Mã tham chiếu đã tồn tại!";
    res.status(500).json(error);
  } else {
    try {
      const product = await Product.findByIdAndUpdate(
        req.body._id,
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
  let error;
  try {
    const updateProduct = await Product.findById(req.body._id);
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

// FOR CLIENT
// GET PRODUCT OF CATEGORY
const getProductOfCategory = async (req, res) => {
  let error;
  try {
    const perPage = 40;
    const products = await Product
      .find({ categories: req.params.id, isActive: true }, "_id name sku desc price origin imgs packing qty")
      .skip((perPage * req.query.page) - perPage)
      .limit(perPage);

    const pages = Math.ceil(products.length / perPage);

    // UPDATE INFO ORIGIN FOR PRODUCTS
    const updateInfoProducts = products?.length ? await Promise.all(products.map(async (product) => {
      const updateInfo = {
        ...product._doc,
        origin: await Origin.findById(product.origin, "_id name"),
      };
      return updateInfo
    })) : [];

    // GET FILTER LIST
    const filters = Object.values(updateInfoProducts?.reduce((obj, product) => {
      if (!obj[product.origin._id]) {
        obj[product.origin._id] = { _id: product.origin._id, name: product.origin.name, count: 1 };
      } else {
        obj[product.origin._id].count++;
      }
      return obj
    }, {}));

    // FILTER PRODUCTS
    const filterdProducts = req.query.filter ? updateInfoProducts?.filter(product => product.origin.name === req.query.filter) : updateInfoProducts;

    if (!filterdProducts.length) {
      error = "Page not found";
      return res.status(404).json(error);
    }

    // SORT PRODUCTS
    let productListSort;
    switch (req.query.sort) {
      case "nameAZ":
        productListSort = filterdProducts.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        productListSort = filterdProducts.slice().sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowToHigh":
        productListSort = filterdProducts.slice().sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        productListSort = filterdProducts.slice().sort((a, b) => b.price - a.price);
        break;
      default:
        productListSort = filterdProducts;
        break;
    };

    return res.status(201).json({ products: productListSort, pages: pages, filters: filters });
  } catch {
    error = "Not found";
    return res.status(404).json(error);
  }
};

// GET CURRENT PRODUCT
const getCurrentProductClient = async (req, res) => {
  let error;
  try {
    const product = await Product.findById(req.params.id, "_id name sku desc price origin imgs packing qty");
    const origin = await Origin.findById(product.origin, "_id name");
    const updateProduct = {
      ...product._doc,
      origin: origin,
    };
    console.log(updateProduct)
    return res.status(201).json(updateProduct);
  } catch {
    error = "Page not found"
    return res.status(404).json(error);
  }
};

// SEARCH PRODUCT
const getProductsForSearch = async (req, res) => {
  let errors = {};
  const perPage = 40;

  try {
    const query = {
      name: { $regex: req.query.query, $options: "i" },
      isActive: true,
    };

    // GET PRODUCTS WITH REGEX 
    const products = req.query.page ?
      // FULL SEARCH FOR SEARCH PAGE
      await Product
        .find(query, "_id name sku desc price origin imgs packing")
        .skip((perPage * req.query.page) - perPage)
        .limit(perPage) :

      // QUICK SEARCH FOR SEARCH BOX
      await Product
        .find(query, "_id name sku desc price origin imgs packing")
        .limit(10);

    const pages = Math.ceil(products.length / perPage);

    // UPDATE INFO ORIGIN FOR PRODUCTS
    const updateInfoProducts = products?.length ? await Promise.all(products.map(async (product) => {
      const updateInfo = {
        ...product._doc,
        origin: await Origin.findById(product.origin, "_id name"),
      };
      return updateInfo
    })) : [];

    // GET FILTER LIST
    const filters = Object.values(updateInfoProducts?.reduce((obj, product) => {
      if (!obj[product.origin._id]) {
        obj[product.origin._id] = { _id: product.origin._id, name: product.origin.name, count: 1 };
      } else {
        obj[product.origin._id].count++;
      }
      return obj
    }, {}));

    // FILTER PRODUCTS
    const filterdProducts = req.query.filter ? updateInfoProducts?.filter(product => product.origin._id == req.query.filter) : updateInfoProducts;

    // SORT PRODUCTS
    let productListSort;
    switch (req.query.sort) {
      case "nameAZ":
        productListSort = filterdProducts.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        productListSort = filterdProducts.slice().sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowToHigh":
        productListSort = filterdProducts.slice().sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        productListSort = filterdProducts.slice().sort((a, b) => b.price - a.price);
        break;
      default:
        productListSort = filterdProducts;
        break;
    };

    return res.status(201).json({ products: productListSort, pages: pages, filters: filters });
  } catch {

  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getCurrentProduct,
  updateProduct,
  updateStock,
  deleteProduct,
  getCurrentProductClient,
  getProductOfCategory,
  getProductsForSearch
};