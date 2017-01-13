const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  skills: Array,
  activeEvent: String,
  profilePic: String,
});

module.exports = mongoose.model('User', UserSchema);
