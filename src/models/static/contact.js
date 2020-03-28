const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1
  },
  middleName: {
    type: String,
    required: false,
    minLength: 1
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1
  },
  email: String,
  phone: String,
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Address'
  }
});

module.exports = mongoose.model('Contact', schema);