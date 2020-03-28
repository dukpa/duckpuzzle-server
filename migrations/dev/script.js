const mongoose = require("mongoose");
const loadMongoose = require('loaders/mongoose');
const migrate = require('./dev.js');

(async function() {
  await loadMongoose();
  await migrate();

  console.log('Disconnecting from mongoose');
  try {
    await mongoose.disconnect();
  } catch(e) {
    console.error(e);
  }
})();