var express = require('express');
var router = express.Router();
const courseRouter = require('../api/course/course_management/index');
const teacherRouter = require('../api/teacher/teacher_management/index');
const studentRouter = require('../api/student/student_management/index');
const docRouter = require('../api/embdocs_sample/index');
const syllabusRouter = require('../api/syllabus/index');
const signUpRouter = require('../api/user/index');

router.use('/course', courseRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/embdoc', docRouter);
router.use('/syllabus', syllabusRouter);
router.use('/', signUpRouter);
module.exports = router;
