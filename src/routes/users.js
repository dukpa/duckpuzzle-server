const auth = require("../middleware/auth");
const { User } = require("../models/static/user");
const express = require("express");
const router = express.Router();
const registration = require("../services/registration");
const {buildResponse} = require('services/json');

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id name email");
  res.send(buildResponse(req, user));
});

router.post("/", async (req, res, next) => {
  try {
    let user = await registration.newUser(req.body);
    res.send(buildResponse(req, user));
  } catch(e) {
    next(e);
  }
});

module.exports = router;