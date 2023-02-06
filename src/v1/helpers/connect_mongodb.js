require("dotenv").config();
const mongoose = require("mongoose");

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error?.message);
  }
};

module.exports = connectMongodb;
