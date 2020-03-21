const mongoose = require('mongoose');

const schema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    minlength: 3
  },
  shortName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5
  },
  longName: {
    type: String,
    required: true,
    minLength: 1
  }
});

module.exports = mongoose.models.Unit || mongoose.model('Unit', schema);