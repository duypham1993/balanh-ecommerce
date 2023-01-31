import express from "express";
import adminRouter from "./admin.route.js";
import authClientRouter from "./authClient.route.js";
import authAdminRouter from "./authAdmin.route.js";
import customerRouter from "./customer.route.js";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";
import productRouter from "./product.route.js";
import supplierRouter from "./supplier.route.js";
import originRouter from "./origin.route.js";
import categoryRouter from "./category.route.js";
import addressRouter from "./address.route.js";
import refreshTokenRouter from "./refreshToken.route.js";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/authClient", authClientRouter);
router.use("/authAdmin", authAdminRouter);
router.use("/customer", customerRouter);
router.use("/address", addressRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/supplier", supplierRouter);
router.use("/origin", originRouter);
router.use("/category", categoryRouter);
router.use("/refreshToken", refreshTokenRouter);

export default router;