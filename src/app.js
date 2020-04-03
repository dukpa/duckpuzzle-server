var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const config = require("config");
const cors = require('cors');

const {buildErrorResponse} = require('./services/json');
var router = require('./routes');

var app = express();

app.use(cors());

if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

if (typeof global.it !== 'function') {
  //don't attach logger if in a unit test
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err === 'string') {
    err = {
      name: err,
      message: err
    }
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.isJoi) {
    err = createError(400, {
      name: err.name,
      details: err.details
    });
  }
  
  if (!err) {
    err = createError(500);
  }

  if (!err.status) {
    err.status = 500;
  }

  if (err.status === 500) {
    console.error(`${err.name}: ${err.message}`);
  }

  let resp = buildErrorResponse(req, err);

  res.status(resp.error.status);
  res.send(resp);
});

module.exports = app;