const loadMongoose = require('loaders/mongoose');
before(async function() {
  await loadMongoose();
});