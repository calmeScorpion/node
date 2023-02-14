const syllabus = require('../../model/syllabus');
const student = require('../../model/student');
const getSyllabus = async (req, res, next) => {
  //   syllabus.find((err, data) => {
  //     res.json(data);
  //   });

  const data = await syllabus.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'course_id',
        foreignField: '_id',
        as: 'course_details',
      },
    },
    { $unwind: { path: '$course_details', preserveNullAndEmptyArrays: true } },
  ]);
  res.json({
    data: data,
  });
};

const createSyllabus = async (req, res, next) => {
  await syllabus.create(req.body);
  res.json({ msg: 'success' });
};

const updateSyllabus = async (req, res, next) => {
  const id = req.params.id;
  const details = req.body;
  try {
    await syllabus.findByIdAndUpdate(id, details);
    res.redirect('/syllabus');
  } catch (e) {
    return res.json({
      message: 'e',
      resend: true,
    });
  }
};

const deleteSyllabus = async (req, res, next) => {
  try {
    await syllabus.findByIdAndDelete(req.params.id);
    res.redirect('/syllabus');
  } catch (err) {
    res.json({
      message: 'Failed',
    });
  }
};

module.exports = {
  getSyllabus,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
};
