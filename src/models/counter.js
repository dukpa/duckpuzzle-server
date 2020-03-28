const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1
  }
});

schema.statics.getNextValue = async function(type) {
  let counter = await this.findByIdAndUpdate(type,
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

module.exports = mongoose.model('Counter', schema);