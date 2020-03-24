const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const RequestSample = require('./request-sample');

const contactSchema = mongoose.Schema({
  client: {
    type: ObjectId,
    ref: 'Client'
  },
  contact: {
    type: ObjectId,
    ref: 'Contact'
  },
  email: String,
  phone: String
});

const schema = new mongoose.Schema({
  requestNo: {
    type: String,
    required: true
  },
  phantom: {
    type: Boolean,
    default: true
  },
  contactInfo: contactSchema,
  invoicingInfo: contactSchema,
  samples: [{
    type: ObjectId,
    ref: 'RequestSample'
  }]
});

schema.methods.addSample = function(sampleConfig) {
  let sample;
  if (sampleConfig instanceof RequestSample) {
    sample = sampleConfig;
  } else {
    sample = new RequestSample(sampleConfig);
  }
  sample.request = this;
  this.samples.push(sample);
  return sample;
};

module.exports = mongoose.model('Request', schema);