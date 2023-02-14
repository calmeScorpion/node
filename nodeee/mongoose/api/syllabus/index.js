var express = require('express');
var router = express.Router();
const {
  getSyllabus,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
} = require('./controller');

const { syllabusPost } = require('./validator');

router.route('/').get(getSyllabus).post(syllabusPost, createSyllabus);
router.route('/:id').patch(syllabusPost, updateSyllabus).delete(deleteSyllabus);

module.exports = router;
