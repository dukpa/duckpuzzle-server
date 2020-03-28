const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
});

const Address = mongoose.model('Address', schema);

module.exports = Address;