const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema.Types;
const RequestTest = require('models/request/request-test');

const schema = Schema({
  request: {
    type: Object,
    ref: 'Request',
    required: true
  },
  internalSampleNo: {
    type: String
  },
  externalSampleNo: {
    type: String
  },
  containers: [{
    type: ObjectId,
    ref: 'RequestContainer'
  }],
  turnaround: {
    type: ObjectId,
    ref: 'Turnaround'
  },
  tests: [{
    type: ObjectId,
    ref: 'RequestTest'
  }]
});

schema.methods.addTest = function(testConfig) {
  let test;
  if (testConfig instanceof RequestTest) {
    test = testConfig;
  } else {
    test = new RequestTest(testConfig);
  }
  test.sample = this;
  this.tests.push(test);
  return test;
}

module.exports = mongoose.model('RequestSample', schema);