const { Router } = require("express");
const { Request, Response, NextFunction } = require("express");

const userCtrl = require("../../../controllers/user.controller");

export const route = Router();

route
  .route("/")
  .post(async (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
    console.info("Creating a new user");

    const data = req.body ?? {};
    const user = await userCtrl.create(data);

    if(!user) res.status(400).json({ message: "Bad request" })
    console.info("New user created successfully");
    res.status(201).json(user);
  });

module.exports = route;
