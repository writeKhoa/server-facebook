require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongodb } = require("./v1/helpers");

const app = express();
const client = process.env.CLIENT_URL;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: client,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
connectMongodb();

app.use("/api/v1", require("./v1/routes"));

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Not Found",
  });
});

module.exports = app;
