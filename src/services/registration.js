const bcrypt = require("bcrypt");
const { User, validate } = require("../models/static/user");

const EMAIL_IN_ISE = {
  status: 400,
  name: "EMAIL_IN_ISE"
};

async function newUser(userInfo) {
  let {name, password, email} = userInfo;

  let { error } = validate(userInfo);
  if (error) {
    throw error;
  }

  if (await emailInUse(email))
    throw EMAIL_IN_ISE;

  let user = new User({
    name: name,
    email: email
  });
  await user.setPassword(password);
  await user.save();

  return user;
}

async function emailInUse(email) {
  let user = await User.findOne({ email: email });
  return !!user;
}

module.exports = {
  newUser
};