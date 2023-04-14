const router = require("express").Router();

const auth = require("../../configs/middlewares/auth");

const {
  getUser,
  updateUser,
  createUser,
} = require("../../controllers/UserController");

// todo: implement delete method
router.get("/user", auth.required, (req, res, next) => getUser(req, res, next));
router.put("/user", auth.required, (req, res, next) =>
  updateUser(req, res, next)
);
router.post("/user", auth.required, (req, res, next) =>
  createUser(req, res, next)
);

module.exports = router;
