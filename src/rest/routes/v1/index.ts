const { Request, Response } = require("express");
const { Router } = require("express");

const user = require("./user");

export const route = Router();

route.use("/user", (req: typeof Request, res: typeof Response) => user(req, res));

module.exports = route;
