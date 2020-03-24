const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    index: true
  }
});

module.exports = mongoose.model('Test', schema);