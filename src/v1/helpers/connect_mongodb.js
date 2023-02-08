require("dotenv").config();
const mongoose = require("mongoose");

const mongUri = process.env.MONGO_URI || "mongodb://localhost:27017/facebook";

const connectMongodb = async () => {
  try {
    await mongoose.connect(mongUri);
  } catch (error) {
    console.log(error?.message);
  }
};

module.exports = connectMongodb;
