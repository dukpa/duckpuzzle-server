const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

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
  invoicingInfo: contactSchema
});

module.exports = mongoose.model('Request', schema);