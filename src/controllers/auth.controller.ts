const UserSchema = require("../models/user");
const { generateToken } = require("../middlewares/auth");
const IUser = require("../models/interfaces/user");
const bcrypt = require("bcryptjs");

export async function login(username: string,password: string): Promise<{}>{
  if (!username || !password) return {};

  const findUser: typeof IUser = await UserSchema
    .findOne({ username })
    .select("+password");

  if (!findUser) return {};

  const isTruthPassword = await bcrypt.compare(password, findUser.password);

  if (!isTruthPassword) return {};

  else {
    findUser.password = undefined;
    const { _id, username, role, email, zipcode, phone } = findUser ?? {};

    return {
      findUser,
      token: generateToken({
        userId: _id,
        username, role, email, zipcode, phone,
      })};
  }
}
