const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/user");
const auth = require("../../configs/middlewares/auth");

// todo: implement delete method
// todo: add role admin policy

/**
 * get user by id
 */
router.get("/user", auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

/**
 * update user
 */
router.put("/user", auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      const { username, email, avatar, password } = req.body.user;

      const updatedUser = { ...user };

      if (typeof username !== "undefined") {
        updatedUser.username = username;
      }
      if (typeof email !== "undefined") {
        updatedUser.email = email;
      }
      if (typeof avatar !== "undefined") {
        updatedUser.avatar = avatar;
      }
      if (typeof password !== "undefined") {
        updatedUser.setPassword(password);
      }

      return updatedUser
        .save()
        .then(() => res.json({ user: updatedUser.toAuthJSON() }));
    })
    .catch(next);
});

/**
 * login user
 */
router.post("/users/login", (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be empty" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be empty" } });
  }

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      const modifiedUser = { ...user };
      modifiedUser.token = modifiedUser.generateJWT();
      return res.json({ user: modifiedUser.toAuthJSON() });
    }

    return res.status(422).json(info);
  })(req, res, next);

  return undefined;
});

/**
 * create a new user
 */
router.post("/users", (req, res, next) => {
  const user = new User();

  const { username, email, avatar, password } = req.body.user;

  user.username = username;
  user.email = email;
  user.avatar = avatar;
  user.setPassword(password);

  user
    .save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next);
});

module.exports = router;
