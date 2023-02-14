var express = require('express');
var router = express.Router();
const {
  getStudents,
  createStudent,
  editStudents,
  deleteStudent,
} = require('./controller');

router.route('/').get(getStudents).post(createStudent);
router.route('/:id').put(editStudents).delete(deleteStudent);

module.exports = router;
