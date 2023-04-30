const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            errors: { message: "invalid credentials" },
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
