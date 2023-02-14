const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const student = new Schema(
  {
    f_name: String,
    l_name: String,
    age: Number,
    start_date: Date,
    course_id: {
      type: ObjectId,
      ref: 'course',
    },
    marks: Array,
    extra_mark: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('s_student', student);
