const express = require("express");
const route = express.Router();
const { postsController: controller } = require("../controllers");
const { usersMiddlewares: middlewares } = require("../middlewares");


route.get("/", middlewares.verifyAccessToken, controller.home);

module.exports = route;
