const { Router } = require("express");

const user = require("./user");

export const route = Router();

route.use("/user", user);

module.exports = route;
