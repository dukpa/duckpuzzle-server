const express = require('express');
const router = express.Router();

const {createDraftRequest} = require('services/request/request-service');

router.put('/', async function(req, res, next) {
  try {
    const request = await createDraftRequest();
    res.send(request);
  } catch(err) {
    next(err);
  }
});

module.exports = router;