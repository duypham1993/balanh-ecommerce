import mongoose from "mongoose";

const dbConn = () => {
  const mongoURL = process.env.MONGO_URL;

  mongoose.connect(mongoURL)
    .then(() => console.log("Connect MongoDB successfull"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConn;