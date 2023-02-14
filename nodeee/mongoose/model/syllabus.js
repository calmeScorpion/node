const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const syllabuss = new Schema({
  syllabus_code: String,
  course_id: {
    type: ObjectId,
    ref: 'course',
  },
  duration: Number,
  syllabus: Array,
});

module.exports = mongoose.model('syllabus', syllabuss);
