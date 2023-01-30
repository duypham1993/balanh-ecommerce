import Order from "../models/Order";
import Product from "../models/Product";
import { nanoid } from 'nanoid';
import { updateInfoOrder } from "../utils/updateInfoOrder";

//CREATE
const createOrder = async (req, res) => {
  let error = {};
  try {
    const orderProducts = req.body.products;
    const orderProductsID = orderProducts.map(product => product._id);
    const findProducts = await Product.find({ _id: { $in: orderProductsID }, isActive: true }, "name price costPrice packing qty");

    if (!findProducts.length || findProducts.length < orderProducts.length) {
      error.other = "Một số sản phẩm trong giỏ hàng tạm thời ngừng bán, vui lòng tải lại trang!";
      error.reload = true;
      return res.status(500).json(error);
    };

    orderProducts.sort((a, b) => a._id.localeCompare(b._id));
    findProducts.sort((a, b) => a._id.toString().localeCompare(b._id.toString()));

    for (let i = 0; i < orderProducts.length; i++) {
      if (orderProducts[i].name !== findProducts[i].name || orderProducts[i].price !== findProducts[i].price || orderProducts[i].packing !== findProducts[i].packing) {
        error.other = "Thông tin một số sản phẩm đã thay đổi vui lòng tải lại trang!";
        error.reload = true;
        return res.status(500).json(error);
      }

      if (orderProducts[i].qty > findProducts[i].qty) {
        error.other = `Số lượng đặt ${orderProducts[i].name} vượt quá số lượng trong kho!`;
        error.backToCart = true;
        return res.status(500).json(error);
      }
    };

    const updateProducts = orderProducts.map((product, i) => {
      product.costPrice = findProducts[i].costPrice;
      return product;
    })

    const newOrder = new Order({
      ...req.body,
      products: updateProducts,
      codeOrder: nanoid(6),
      status: [
        {
          title: "Đặt hàng thành công",
          time: new Date()
        }
      ]
    });

    const savedOrder = await newOrder.save();
    await Promise.all(updateProducts.map(async (product) => {
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { qty: -product.qty } },
        { new: true }
      )
    }))
    res.status(200).json(savedOrder);
  } catch {
    error.other = "Tạo đơn hàng thất bại!";
    res.status(500).json(error);
  }
};

//GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerID: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET CURRENT ORDERS
const getCurrentOrder = async (req, res) => {
  let error;
  try {
    const order = [await Order.findById(req.params.id)];
    const [updateInfo] = await updateInfoOrder(order);
    res.status(200).json(updateInfo);
  } catch {
    error = "Page not found";
    res.status(404).json(error);
  }
};

//GET ALL
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const updateInfoOrders = await updateInfoOrder(orders);
    res.status(200).json(updateInfoOrders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateOrder = async (req, res) => {
  console.log(req.body.status)
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          status: {
            title: req.body.status,
            time: new Date()
          }
        },
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getCurrentOrder,
  updateOrder,
  deleteOrder
};