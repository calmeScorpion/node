const form = require('../../model/form');

const getUser = async (req, res, next) => {
  let details = await form.find();
  if (details === null) console.log('error');
  else res.json(details);
};

const postUser = (req, res, next) => {
  form.create(req.body, (err, data) => {
    let error = {};
    if (err.errors.name) {
      error = { ...error, name: err.errors.name.message };
    }
    if (err.errors.phone) {
      error = { ...error, phone: err.errors.phone.message };
    }
    if (err.errors.email) {
      error = { ...error, email: err.errors.email.message };
    }
    if (err.errors.start_date) {
      error = { ...error, start_date: err.errors.start_date.message };
    }
    if (err.errors.end_date) {
      error = { ...error, end_date: err.errors.end_date.message };
    }
    if (err.errors.age) {
      error = { ...error, age: err.errors.age.message };
    }
    if (err) res.json(error);
    else res.json(data);
  });
};

module.exports = { getUser, postUser };
