const passport = require("passport");

const User = require("../models/user");

const signIn = async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (!email) {
    return res.status(422).json({ errors: { email: "can't be empty" } });
  }

  if (!password) {
    return res.status(422).json({ errors: { password: "can't be empty" } });
  }

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      const modifiedUser = user;
      modifiedUser.token = modifiedUser.generateJWT();
      return res.json(modifiedUser.toAuthJSON());
    }

    return res.status(422).json(info);
  })(req, res, next);

  return undefined;
};

const signUp = async (req, res, next) => {
  const { username, email, avatar, password } = req.body;

  const findUser = await User.findOne({ username });

  if (findUser) {
    return res.status(422).json({ error: "User already exists" });
  }

  const user = new User({ username, email, avatar, password });

  user.setPassword(password);

  return user
    .save()
    .then(() => res.json(user.toAuthJSON()))
    .catch(next);
};

module.exports = { signIn, signUp };
