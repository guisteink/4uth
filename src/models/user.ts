const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const mongo = require("../../config/database");
const userStatus = require("./enums/user.status");
const userRoles = require("./enums/user.roles");

const schema: typeof mongoose.Schema = mongo.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    selected: false,
  },
  role: {
    type: String,
    enum: ["administrator", "manager", "user", "guest"],
    // default: userRoles[0],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    // default: userStatus[0],
  },
  email: { type: String },
  zipcode: { type: Number },
  phone: { type: Number },
  dob: {
    type: Object,
    data: { type: Date },
    age: { type: Number },
  }
}, { timestamp: true });

UserSchema.pre("save", async function (this: typeof mongoose.Schema,next: () => void) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  const birth = Math.round((new Date().getTime() - new Date(this.dob.date).getTime()) / (31536000000))
  this.dob.age = birth;
  const now = new Date(Date.now())
  this.registered.data = now;

  next();
});

module.exports = mongoose.model("User", UserSchema);
