const express = require('express');
const router = express.Router();

const auth = require('middleware/auth');
const {buildResponse} = require('services/json');
const {createDraftRequest} = require('services/request/request-service');

router.put('/', auth, async function(req, res, next) {
  try {
    const request = await createDraftRequest();
    res.send(buildResponse(req, request));
  } catch(err) {
    next(err);
  }
});

module.exports = router;