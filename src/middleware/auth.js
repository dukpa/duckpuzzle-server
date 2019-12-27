const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require('../services/authentication');

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  try {
    let user = auth.authenticate(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};