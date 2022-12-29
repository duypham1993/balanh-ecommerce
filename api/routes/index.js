import express from "express";
import adminRouter from "./api/admin";
import authClientRouter from "./api/authClient";
import authAdminRouter from "./api/authAdmin";
import customerRouter from "./api/customer";
import cartRouter from "./api/cart";
import orderRouter from "./api/order";
import productRouter from "./api/product";
import supplierRouter from "./api/supplier";
import originRouter from "./api/origin";
import categoryRouter from "./api/category";
import addressRouter from "./api/address";
import refreshTokenRouter from "./api/refreshToken";

const router = express.Router();

router.use("/api/admin", adminRouter);
router.use("/api/authClient", authClientRouter);
router.use("/api/authAdmin", authAdminRouter);
router.use("/api/customer", customerRouter);
router.use("/api/address", addressRouter);
router.use("/api/cart", cartRouter);
router.use("/api/order", orderRouter);
router.use("/api/product", productRouter);
router.use("/api/supplier", supplierRouter);
router.use("/api/origin", originRouter);
router.use("/api/category", categoryRouter);
router.use("/api/refreshToken", refreshTokenRouter);

module.exports = router;