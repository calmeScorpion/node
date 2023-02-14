const student = require('../../../model/student');

const getStudents = async (req, res, next) => {
  // res.send('student details');

  var perPage = 2,
    page = Math.max(0);

  let object = {};
  if (req.query.id) {
    object._id = req.query.id;
  }
  if (req.query.course_id) {
    object.course_id = req.query.course_id;
  }
  if (req.query.f_name) {
    object.f_name = req.query.f_name;
  }
  if (req.query.start_date) {
    object.start_date = { $gte: new Date(req.query.start_date).toISOString() };
  }
  if (req.query.total_mark) {
    object.total_mark = req.query.total_mark;
  }

  // date filter
  // let { start_date, end_date } = req.query;
  // let filtersDate =
  //   start_date && end_date
  //     ? {
  //         start_date: {
  //           $gt: new Date(start_date).toISOString(),
  //           $lt: new Date(end_date).toISOString(),
  //         },
  //       }
  //     : {};

  // const data = Object.keys(req.query).length
  //   ? await student
  //       .find({
  //         ...filtersDate,
  //         ...object,
  //         f_name: { $regex: new RegExp(object.f_name, 'i') },
  //       })

  //       .populate('course_id')
  //   : await student
  //       .find()
  // .select({
  //   _id: 0,
  //   f_name: 1,
  //   l_name: 1,
  // })
  // .populate('course_id')
  // .skip(page * perPage)
  // .limit(perPage);
  const data = await student
    .aggregate([
      {
        $lookup: {
          from: 'syllabuses',
          localField: 'course_id',
          foreignField: 'course_id',
          as: 'course_details',
        },
      },
      {
        $unwind: { path: '$course_details', preserveNullAndEmptyArrays: true },
      },
      {
        $match: { 'course_details.syllabus_code': req.query.code },
      },
      // {
      //   $addFields: {
      //     full_name: { $concat: ['$f_name', ' ', '$l_name'] },
      //     total_mark: { $sum: '$marks' },
      //   },
      // },
      // {
      //   $addFields: {
      //     grand_total: { $add: ['$total_mark', '$extra_mark'] },
      //   },
      // },
      // {
      //   $addFields: {
      //     result: {
      //       $cond: {
      //         if: { $gte: ['$grand_total', 350] },
      //         then: 'pass',
      //         else: 'fail',
      //       },
      //     },
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'courses',
      //     localField: 'course_id',
      //     foreignField: '_id',
      //     as: 'course_details',
      //   },
      // },
      // {
      //   $unwind: { path: '$course_details', preserveNullAndEmptyArrays: true },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     full_name: 1,
      //     'course_details.name': 1,
      //     marks: 1,
      //     extra_mark: 1,
      //     total_mark: 1,
      //     grand_total: 1,
      //     result: 1,
      //   },
      // },
      // {
      //   $sort: {
      //     [req.query.sort]: req.query.order ? parseInt(req.query.order) : 1,
      //   },
      // },
      // {
      //   $group: {
      //     _id: '$result',
      //     remarks: { $push: '$$ROOT' },
      //     average: { $avg: '$grand_total' },
      //     count: { $sum: 1 },
      //     last: { $last: '$course_details' },
      //     first: { $first: '$grand_total' },
      //     min: { $min: '$total_mark' },
      //     max: { $max: '$total_mark' },
      //   },
      // },
    ])
    .skip(page * perPage)
    .limit(perPage);

  res.json({
    success: true,
    data,
  });
};

const createStudent = async (req, res, next) => {
  const s = new student(req.body);
  s.save((err) => {
    if (err) {
      console.log('error');
      res.json({
        success: false,
        msg: err,
      });
    }

    res.json({
      success: true,
      msg: 'Added Successfully',
    });
  });
};

const editStudents = (req, res) => {
  student.findByIdAndUpdate(req.body.id, req.body.values, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Id not found' });
    }
    console.log(result);
    res.json('Updated');
  });
};

const deleteStudent = (req, res) => {
  student.findByIdAndDelete(req.body.id, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Id not found' });
    } else {
      console.log('Deleted : ', result);
      res.json({ msg: 'deleted' });
    }
  });
};

module.exports = { getStudents, createStudent, editStudents, deleteStudent };
