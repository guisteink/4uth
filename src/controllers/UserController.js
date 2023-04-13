const User = require("../models/user");

const getUser = async (req, res, next) => {
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};

const updateUser = async (req, res, next) => {
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
};

const createUser = async (req, res, next) => {
  // todo: user exists?
  const user = new User();

  const { username, email, avatar, role, password } = req.body.user;

  user.username = username;
  user.email = email;
  user.avatar = avatar;
  user.role = role;
  user.setPassword(password);

  user
    .save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next);
};

module.exports = { getUser, updateUser, createUser };
