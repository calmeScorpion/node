const Joi = require('joi');

const tescherPost = async (req, res, next) => {
  const teacherSchema = Joi.object({
    fname: Joi.string().min(2).max(20).required(),
    lname: Joi.string().min(3).max(20).required(),
    qualification: Joi.string().required(),
  });

  try {
    req.body = await teacherSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ status: 'failed', err: err.message });
  }
};

module.exports = { tescherPost };
