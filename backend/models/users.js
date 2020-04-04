const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  heshtegs: { type: Array },
  presents: { type: Array },
  userName: { type: String },
  userFamilyName: { type: String },
  userMiddleName: { type: String },
  userEmail: { type: String },
  userInfo: { type: String },
  userAvatar:{type:String, default:'defaultAVA.png'}
});

module.exports = mongoose.model('users', userSchema);
