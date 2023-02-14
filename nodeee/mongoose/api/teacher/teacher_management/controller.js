const teacher = require('../../../model/teacher');

const getTeacher = (req, res, next) => {
  teacher.find((err, data) => {
    res.json(data);
  });
};

const createTeacher = async (req, res, next) => {
  await teacher.create(req.body);
  res.json({
    success: true,
    msg: ' teacher Added Successfully',
  });
};

const editTeacher = (req, res) => {
  teacher.findByIdAndUpdate(req.body.id, req.body.values, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Id not found');
    }
    res.json('Updated');
    console.log(result);
  });
};

const deleteTeacher = (req, res) => {
  teacher.findByIdAndDelete(req.body.id, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Id not found');
    } else {
      console.log('Deleted : ', result);
      res.json('deleted');
    }
  });
};

module.exports = { getTeacher, createTeacher, editTeacher, deleteTeacher };
