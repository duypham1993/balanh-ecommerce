import express from "express";
import dbConn from "./config/dbConn";
require('dotenv').config();
import cookieParse from "cookie-parser";
import cors from "cors";
// import corsOptions from "./config/corsConfig";

const app = express();
const port = process.env.PORT || 3000;

dbConn();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());
app.use(require("./routes/index"));

app.listen(port, () => {
  console.log("Port is: ", port);
});
