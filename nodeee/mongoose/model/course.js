const mongoose = require('mongoose');
const { Schema } = mongoose;

const course = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    duration: {
      type: Number,
      required: false,
    },
    startdate: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('course', course);
