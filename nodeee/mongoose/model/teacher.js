const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacher = new Schema({
  fname: String,
  lname: String,
  qualification: String,
});

module.exports = mongoose.model('teacher', teacher);
