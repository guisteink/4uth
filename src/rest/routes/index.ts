const { Router } = require("express");
const v1 = require("./v1/index");
const { Request, Response } = require("express");

export const route = Router();

route
  .post("/health-check", (req: any, res: any) => {
    const data = req.body;
    res.status(200).json({ message: "Hello World", success: true });
});

route.use("/v1", (req: typeof Request, res: typeof Response) => v1(req, res));

module.exports = route;
