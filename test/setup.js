const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const doMigration = require('../migrations/dev/dev')
const loadMongoose = require('loaders/mongoose');

before(async function() {
  await loadMongoose();
  await doMigration();

  console.log('');
  console.log('Mocha time')
});

after(async function() {
  try {
    mongoose.models = {};
    await mongoose.disconnect();
  } catch(e) {
    console.error(e);
  }
})