const auth = require("../middleware/auth");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const registration = require("../services/registration");

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id name email");
  res.send(user);
});

router.post("/", async (req, res, next) => {
  try {
    let user = await registration.newUser(req.body);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch(e) {
    next(e);
  }
});

module.exports = router;