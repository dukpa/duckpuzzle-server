const express = require("express");
const router = express.Router();

const auth = require('middleware/auth');
const {buildResponse} = require('services/json');
const {getClients} = require('services/client-service');

router.get('/', auth, async function(req, res, next) {
  try {
    let clients = await getClients();
    let resp = buildResponse(req, clients, 'Client');
    res.send(resp);
  } catch(e) {
    next(e);
  }
});

module.exports = router;