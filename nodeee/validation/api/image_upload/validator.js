const Joi = require('joi');

const nameValidation = async (req, res, next) => {
  const studentSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
  });

  try {
    req.body = await studentSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ status: 'failed', err: err.message });
  }
};

module.exports = { nameValidation };
