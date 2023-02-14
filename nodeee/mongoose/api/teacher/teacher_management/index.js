var express = require('express');
var router = express.Router();
const {
  getTeacher,
  createTeacher,
  editTeacher,
  deleteTeacher,
} = require('./controller');

const { tescherPost } = require('./validator');

router.route('/').get(getTeacher).post(tescherPost, createTeacher);
router.route('/:id').put(editTeacher).delete(deleteTeacher);

module.exports = router;
