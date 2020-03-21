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
  phone: String
});

module.exports = mongoose.models.Contact || mongoose.model('Contact', schema);