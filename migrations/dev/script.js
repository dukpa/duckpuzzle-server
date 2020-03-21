const mongoose = require("mongoose");
const loadMongoose = require('../../src/loaders/mongoose');
const doMigration = require('./dev.js');

(async function() {
  await loadMongoose();
  await doMigration();

  console.log('Disconnecting from mongoose');
  try {
    await mongoose.disconnect();
  } catch(e) {
    console.error(e);
  }
})();