const createError = require('http-errors');
const {buildErrorResponse} = require('services/json');

function handleError(err, req, res, next) {
  if (typeof err === 'string') {
    err = createError(500, err);
  } else if (err.isJoi) {
    err = createError(400, {
      name: err.name,
      details: err.details
    });
  } else if (!err) {
    err = createError(500);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!err.status) {
    err.status = 500;
  }

  if (err.status === 500) {
    console.error(`${err.name}: ${err.message}`);
  }

  let resp = buildErrorResponse(req, err);

  res.status(resp.error.status);
  res.send(resp);
}

module.exports = handleError;