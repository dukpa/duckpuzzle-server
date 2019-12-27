const express = require("express");
const router = express.Router();

const auth = require('../services/authentication');

router.post("/", async (req, res, next) => {
  const {email, password} = req.body;
  try {
    let token = await auth.login(email, password);
    res.send({
      token,
      email,
      password
    });
  } catch(e) {
    next(e);
  }
});

module.exports = router;