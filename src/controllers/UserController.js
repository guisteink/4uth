const User = require("../models/user");

const getUser = async (req, res, next) => {
  const permissions = User.getJwtContent(req) ?? {};
  const { isAdmin, isManager } = permissions ?? {};

  if (!isAdmin && !isManager) {
    return res.status(400).json({ error: "Unauthorized operation" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    return res.json(user.toAuthJSON());
  } catch (error) {
    next(error);
  }
};

const listUsers = async (req, res, next) => {
  const permissions = User.getJwtContent(req) ?? {};
  const { isAdmin, isManager } = permissions ?? {};

  if (!isAdmin && !isManager) {
    return res.status(400).json({ error: "Unauthorized operation" });
  }

  try {
    const users = await User.find();
    return res.json(users.map(user => user.toAuthJSON())); // prettier-ignore
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const permissions = User.getJwtContent(req) ?? {};
  const { isAdmin, isManager } = permissions ?? {};

  if (!isAdmin && !isManager) {
    return res.status(400).json({ error: "Unauthorized operation" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.deleteOne({ _id: user.id });
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const permissions = User.getJwtContent(req) ?? {};
  const { isAdmin, isManager } = permissions ?? {};

  if (!isAdmin && !isManager) {
    return res.status(400).json({ error: "Unauthorized operation" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.sendStatus(401);
    }

    const { username, email, avatar, role, password } = req.body ?? {};

    const updatedUser = { ...user };

    updatedUser.username =
      typeof username !== "undefined" ? username : updatedUser.username;
    updatedUser.email =
      typeof email !== "undefined" ? email : updatedUser.email;
    updatedUser.role = typeof role !== "undefined" ? role : updatedUser.role;
    updatedUser.avatar =
      typeof avatar !== "undefined" ? avatar : updatedUser.avatar;
    if (typeof password !== "undefined") {
      updatedUser.setPassword(password);
    }

    await updatedUser.save();

    return res.json(updatedUser.toAuthJSON());
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const permissions = User.getJwtContent(req) ?? {};
  const { isAdmin, isManager } = permissions ?? {};

  if (!isAdmin && !isManager) {
    return res.status(400).json({ error: "Unauthorized operation" });
  }

  const { username, email, avatar, role, password } = req.body ?? {};

  try {
    const findUser = await User.findOne({ username });
    if (findUser) {
      throw new Error("User already exists");
    }

    const user = new User({ username, email, avatar, role, password });

    user.setPassword(password);

    await user.save();

    return res.json(user.toAuthJSON());
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUser, createUser, listUsers, deleteUser };
