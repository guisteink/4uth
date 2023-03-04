const { Router } = require("express");
const router  = require("./v1/index");

export const route = Router();

route
  .route("/health-check")
  .get((req: any, res: any) => {
    res.status(200).json({ message: "Hello World", success: true });
});

route.use("/v1", router);

module.exports = route;
