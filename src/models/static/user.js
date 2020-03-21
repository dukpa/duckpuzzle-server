const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('myprivatekey')
  ); 
  return token;
}

UserSchema.methods.authenticate = async function(password) {
  let success = await bcrypt.compare(password, this.password);
  if (success) {
    return this.generateAuthToken();
  }
}

UserSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
}

const User = mongoose.models.User || mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;