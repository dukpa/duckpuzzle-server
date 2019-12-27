var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const config = require("config");

const mongoose = require("./loaders/mongoose");

var router = require('./routes');

var app = express();

if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

(async function load() {
  await mongoose();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', router);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.isJoi) {
      err = createError(400, {
        name: err.name,
        details: err.details
      });
    }
    
    if (!err || !err.status) {
      err = createError(500);
    }

    if (err.status === 500) {
      console.error(err);
    }

    res.status(err.status);
    res.send(err);
  });

  app.listen(config.get('port'), err => {
    if (err) {
      console.error(err);
      process.exit();
      return;
    }
    console.info(`
      ################################################
         Server listening on port: ${config.port} 
      ################################################
    `);
  });
})();