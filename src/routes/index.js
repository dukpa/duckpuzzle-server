const express = require("express");
const router = express.Router();

const login = require('./login');
const users = require('./users');
const request = require('./request');
const clients = require('./clients')

router.use('/login', login);
router.use('/users', users);
router.use('/request', request);
router.use('/clients', clients);

module.exports = router;