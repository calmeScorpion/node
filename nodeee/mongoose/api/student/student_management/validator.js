const Joi = require('joi');

const studentPost = async (req, res, next) => {
  const studentSchema = Joi.object({
    bus_id: Joi.string().alphanum().min(2).max(20).required(),
    l_name: Joi.string().alphanum().min(3).max(20).required(),
    age: Joi.number().min(18).required(),
    start_date: Joi.date().required(),
  });

  try {
    req.body = await studentSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ status: 'failed', err: err.message });
  }
};

module.exports = { studentPost };
