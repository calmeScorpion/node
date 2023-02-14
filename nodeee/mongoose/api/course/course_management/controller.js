const course = require('../../../model/course');

courses = [];
const getCourse = (req, res, next) => {
  course.find((err, data) => {
    // res.render('../views/courses', { courses: data });
    res.json(data);
  });
};

const postCourse = async (req, res, next) => {
  await course.create(req.body);
  // res.render('../views/courses');
  res.json({
    success: true,
    msg: ' course Added Successfully',
  });
};

const editCourse = (req, res) => {
  course.findByIdAndUpdate(req.body.id, req.body.values, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Id not found');
    }
    console.log(result);
    res.json('Updated');
  });
  console.log('Updated');
};

const deleteCourse = (req, res) => {
  course.findByIdAndDelete(req.body.id, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Id not found');
    } else {
      console.log('Deleted : ', result);
      res.json('deleted');
    }
  });
};

const getCourseById = (req, res, next) => {
  course.findById(req.params.id, (err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
    }
    res.render('../../../views/courses', { courses: [data] });
    // res.json(data);
  });
};

module.exports = {
  getCourse,
  postCourse,
  getCourseById,
  editCourse,
  deleteCourse,
};
