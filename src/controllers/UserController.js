const User = require("../models/user");

const getUser = async (req, res, next) => {
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json(user.toAuthJSON());
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

      return updatedUser.save().then(() => res.json(updatedUser.toAuthJSON()));
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  const { username, email, avatar, role, password } = req.body ?? {};

  const findUser = await User.findOne({ username });

  if (findUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = new User({ username, email, avatar, role, password });

  user.setPassword(password);

  return user
    .save()
    .then(() => res.json(user.toAuthJSON()))
    .catch(next);
};

module.exports = { getUser, updateUser, createUser };
