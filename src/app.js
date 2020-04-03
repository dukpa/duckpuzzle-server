const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const config = require("config");
const cors = require('cors');

const router = require('./routes');
const handleError = require('./middleware/errors');

const app = express();

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
app.use(handleError);

module.exports = app;