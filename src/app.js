require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongodb } = require("./v1/helpers");

const app = express();

const origins =
  process.env.NODE_ENV === "development"
    ? [
        "http://127.0.0.1:5173",
        "http://locahlhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
      ]
    : [process.env.CLIENT_URL];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: origins,
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
