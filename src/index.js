const config = require("config");
const loadMongoose = require("./loaders/mongoose");
const app = require('./app');

loadMongoose().then(() => {
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
});