const UserSchema = require("../models/user");
const IUser = require("../models/interfaces/user");

export async function create(data: typeof IUser){
  if (!(data?.username || data?.password)) return;

  const newUser = new UserSchema(data, { timestamps: true});
  return await newUser.save();
}

//update
//delete
//get
//list
