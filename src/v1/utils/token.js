require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAccessToken = async (id) => {
  return jwt.sign({ id }, process.env.KEY_ACCESS_TOKEN, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = async (id) => {
  return jwt.sign({ id }, process.env.KEY_REFRESH_TOKEN, {
    expiresIn: "60d",
  });
};

const decodeAccessToken = (token) => {
  return jwt.verify(token, process.env.KEY_ACCESS_TOKEN);
};

const decodeRefreshToken = (token) => {
  return jwt.verify(token, process.env.KEY_REFRESH_TOKEN);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
};
