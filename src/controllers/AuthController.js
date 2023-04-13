const passport = require("../configs/passport");
const User = require("../models/user");

async function userExists(req) {
  const data = req.body;
  const findUser = await UserSchema.findOne({
    "login.username": {
      $eq: _.get(data, "login.username"),
    },
  });
  return findUser ? 1 : 0;
}

const signIn = async (req, res, next) => {
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
};

const signUp = async (req, res, next) => {
  const { username, email, avatar, password } = req.body.user;

  const findUser = await User.findOne({
    username: {
      $eq: username,
    },
  });

  if(!findUser) {
    const user = new User();

    user.username = username;
    user.email = email;
    user.avatar = avatar;
    user.setPassword(password);

    user
      .save()
      .then(() => res.json({ user: user.toAuthJSON() }))
      .catch(next);
  }

  return res.status(400).json({error: "User already exists"});
};

module.exports = { signIn, signUp };
