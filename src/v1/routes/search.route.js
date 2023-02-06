const express = require("express");
const route = express.Router();
const { searchController: controller } = require("../controllers");
const { usersMiddlewares: middlewares } = require("../middlewares");
route.post("/", middlewares.verifyAccessToken, controller.search);

module.exports = route;
