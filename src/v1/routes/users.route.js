const express = require("express");
const route = express.Router();
const { usersMiddlewares: middlewares } = require("../middlewares");
const { usersController: controller } = require("../controllers");

route.get("/find/:userId", controller.findNotLogin);

route.get("/:userId", middlewares.verifyAccessToken, controller.findUser);

route.post("/register", middlewares.validateRegister, controller.register);

route.post("/login", middlewares.validateLogin, controller.login);

route.post("/reLogin", middlewares.verifyRefreshToken, controller.reLogin);

route.post(
  "/newAccess",
  middlewares.verifyRefreshToken,
  controller.getNewAccessToken
);

route.post("/logout", middlewares.verifyRefreshToken, controller.logout);

module.exports = route;
