const jwt = require('jsonwebtoken');
const config = require('config')
const {User} = require('../models/static/user');

const BAD_USER_PASS = {
  status: 401,
  code: 'BAD_USER_PASS',
  message: 'The user name and/or password is incorrect'
};
const MISSING_TOKEN = {
  status: 401,
  code: 'MISSING_TOKEN',
  message: 'No JWT token was provided'
};
const INVALID_TOKEN = {
  status: 401,
  code: 'INVALID_TOKEN',
  message: 'The provided token was not valid'
};

async function login(username, password) {
  let user = await User.findOne({email: username});
  if (!user) {
    throw BAD_USER_PASS;
  }

  let token = await user.authenticate(password);
  if (!token) {
    throw BAD_USER_PASS;
  }

  return token;
}

function authenticate(token) {
  if (!token) {
    throw MISSING_TOKEN;
  }
  try {
    return jwt.verify(token, config.get("myprivatekey"));
  } catch(err) {
    throw INVALID_TOKEN;
  }
}

exports.login = login;
exports.authenticate = authenticate;

exports.BAD_USER_PASS = BAD_USER_PASS;
exports.INVALID_TOKEN = INVALID_TOKEN;
exports.MISSING_TOKEN = MISSING_TOKEN;