var express = require('express');
var router = express.Router();

const {
  getCourse,
  postCourse,
  getCourseById,
  editCourse,
  deleteCourse,
} = require('./controller');

router.route('/').get(getCourse).post(postCourse);
router.route('/:id').put(editCourse).delete(deleteCourse).get(getCourseById);

module.exports = router;
