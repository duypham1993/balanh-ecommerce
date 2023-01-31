import mongoose from "mongoose";
require('dotenv').config();

const dbConn = () => {
  const mongoURL = process.env.MONGO_URL;

  mongoose.connect(mongoURL)
    .then(() => console.log("Connect MongoDB successfull"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConn;