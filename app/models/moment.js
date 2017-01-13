const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MomentSchema = new Schema({
  name: String,
  address: String,
  skill: String,
  dateTime: Date,
  length: Number,
  description: String,
  volunteer: String,
});

module.exports = mongoose.model('Moment', MomentSchema);
