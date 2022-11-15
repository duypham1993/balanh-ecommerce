import express from "express";
import mongoose from "mongoose";
require('dotenv').config();
import adminRouter from "./routes/admin";
import authClientRouter from "./routes/authClient";
import authAdminRouter from "./routes/authAdmin";
import customerRouter from "./routes/customer";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import productRouter from "./routes/product";
import supplierRouter from "./routes/supplier";
import originRouter from "./routes/origin";
import categoryRouter from "./routes/category";
import deliveryInfoRouter from "./routes/deliveryInfo";
import cors from "cors";

const app = express();
let mongoURL = process.env.MONGO_URL;
let port = process.env.PORT || 3000;

mongoose.connect(mongoURL)
  .then(() => console.log("Connect MongoDB successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/authClient", authClientRouter);
app.use("/api/authAdmin", authAdminRouter);
app.use("/api/customer", customerRouter);
app.use("/api/deliveryInfo", deliveryInfoRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/origin", originRouter);
app.use("/api/category", categoryRouter);
app.listen(port, () => {
  console.log("Port is: ", port);
});
