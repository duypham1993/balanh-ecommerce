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
    const perPage = req.query.limit || 40;
    const currentPage = req.query.page || 1;
    const query = req.query.filter ?
      {
        categories: req.params.id,
        isActive: true,
        origin: req.query.filter
      } :
      {
        categories: req.params.id,
        isActive: true
      }

    let products;
    switch (req.query.sort) {
      case "nameAZ":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "name": 1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "nameZA":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "name": -1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "priceLowToHigh":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "price": 1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "priceHighToLow":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "price": -1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      default:
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
    };
    const pages = Math.ceil(products.length / perPage);

    // UPDATE INFO ORIGIN FOR PRODUCTS
    const updateInfoProducts = products?.length ? await Promise.all(products.map(async (product) => {
      const updateInfo = {
        ...product._doc,
        origin: await Origin.findById(product.origin, "_id name"),
      };
      return updateInfo
    })) : [];

    return res.status(201).json({ products: updateInfoProducts, pages: pages });
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

// FULL SEARCH PRODUCT
const getProductsForSearch = async (req, res) => {
  let error;
  try {
    const perPage = req.query.limit || 40;
    const currentPage = req.query.page || 1;
    const query = req.query.filter ?
      {
        name: { $regex: req.query.query, $options: "i" },
        isActive: true,
        origin: req.query.filter
      } :
      {
        name: { $regex: req.query.query, $options: "i" },
        isActive: true,
      }

    let products;
    switch (req.query.sort) {
      case "nameAZ":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "name": 1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "nameZA":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "name": -1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "priceLowToHigh":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "price": 1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      case "priceHighToLow":
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .sort({ "price": -1 })
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
      default:
        products = await Product
          .find(query, "_id name sku desc price origin imgs packing qty")
          .skip((perPage * currentPage) - perPage)
          .limit(perPage);;
        break;
    };
    const pages = Math.ceil(products.length / perPage);

    // UPDATE INFO ORIGIN FOR PRODUCTS
    const updateInfoProducts = products?.length ? await Promise.all(products.map(async (product) => {
      const updateInfo = {
        ...product._doc,
        origin: await Origin.findById(product.origin, "_id name"),
      };
      return updateInfo
    })) : [];

    return res.status(201).json({ products: updateInfoProducts, pages: pages });
  } catch {
    error = "Not found";
    return res.status(404).json(error);
  }
};

// QUICK SEARCH PRODUCT 
const getProductForQuickSearch = async (req, res) => {
  try {
    const query = {
      name: { $regex: req.query.query, $options: "i" },
      isActive: true,
    };
    const products = await Product.find(query, "_id name sku desc price origin imgs packing qty");
    return res.status(201).json(products);
  } catch (error) {
    return res.status(404).json("Not found");
  }
}

const getFilterProduct = async (req, res) => {
  try {
    let query;
    if (req.query.id) {
      query = {
        categories: req.query.id,
        isActive: true
      }
    } else if (req.query.query) {
      query = {
        name: { $regex: req.query.query, $options: "i" },
        isActive: true
      }
    } else {
      return res.status(500).json("Not found");
    }

    const arrOrigin = await Product.find(query, "origin");

    const updateInfoOrigin = arrOrigin?.length ? await Promise.all(arrOrigin.map(async (item) => await Origin.findById(item.origin, "_id name")
    )) : [];

    // GET FILTER LIST
    const filters = Object.values(updateInfoOrigin?.reduce((obj, origin) => {
      if (!obj[origin._id]) {
        obj[origin._id] = { _id: origin._id, name: origin.name, count: 1 };
      } else {
        obj[origin._id].count++;
      }
      return obj
    }, {}));

    return res.status(201).json(filters);
  } catch (error) {
    return res.status(500).json(error);
  }

}

module.exports = {
  createProduct,
  getAllProducts,
  getCurrentProduct,
  updateProduct,
  updateStock,
  deleteProduct,
  getCurrentProductClient,
  getProductOfCategory,
  getProductsForSearch,
  getProductForQuickSearch,
  getFilterProduct
};