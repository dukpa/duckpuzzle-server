const mongoose = require('mongoose');
const {Schema, Model} = mongoose;
const {ObjectId} = mongoose.Types;

const schema = new Schema({
  sample: {
    type: ObjectId,
    ref: 'RequestSample',
    required: true
  },
  test: {
    type: ObjectId,
    ref: 'Test',
    required: true
  }
});

module.exports = mongoose.model('RequestTest', schema);