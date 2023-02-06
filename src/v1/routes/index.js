const express = require("express");
const route = express.Router();

route.use("/users", require("./users.route"));
route.use("/posts", require("./posts.route"));
route.use("/search", require("./search.route"));

module.exports = route;
