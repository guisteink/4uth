const bcrypt = require("bcryptjs");
const { Schema } = require("mongoose");

const mongo = require("../../config/database");
const userStatus = require("./enums/user.status");
const userRoles = require("./enums/user.roles");

const schema = mongo.Schema;

const UserSchema: typeof Schema = new schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    selected: false,
  },
  role: { default: userRoles[0] },
  status: { default: userStatus[0] },
  email: { type: String },
  zipcode: { type: Number },
  phone: { type: Number },
}, { timestamp: true });

UserSchema.pre("save", async function (this: typeof Schema,next: () => void) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongo.model("User", UserSchema);
