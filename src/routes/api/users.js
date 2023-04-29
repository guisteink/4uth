const router = require("express").Router();

const auth = require("../../configs/middlewares/auth");

const {
  getUser,
  updateUser,
  createUser,
  listUsers,
  deleteUser,
} = require("../../controllers/UserController");

// todo: implement delete method
router
  .get("/user/:id", auth.required, (req, res, next) => getUser(req, res, next))
  .put("/user/:id", auth.required, (req, res, next) =>
    updateUser(req, res, next)
  )
  .delete("/user/:id", auth.required, (req, res, next) =>
    deleteUser(req, res, next)
  );
router
  .get("users", auth.required, (req, res, next) => listUsers(req, res, next))
  .post("/user", auth.required, (req, res, next) => createUser(req, res, next));

module.exports = router;
