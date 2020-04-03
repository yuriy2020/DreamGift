const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  heshtegs: {type: Array},
  presents: {type: Array},
});

module.exports = mongoose.model('users', userSchema);
