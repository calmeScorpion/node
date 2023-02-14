const mutliple = require('../../model/multifile');
const fs = require('fs');
const ejs = require('ejs');

const getImages = async (req, res, next) => {
  try {
    let data = await mutliple.find();
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      msg: e.message,
    });
  }
};

const postImages = async (req, res, next) => {
  try {
    let Image = [];
    req.files.forEach(
      (e) => (Image = [...Image, { path: e.path, contentType: e.mimetype }])
    );
    await mutliple.create({ image: Image });
    res.json({ msg: 'Added successfully' });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

const viewByid = async (req, res, next) => {
  try {
    let data = await mutliple.findById(req.params.id);
    res.send(data);
  } catch (e) {
    res.json({
      msg: e.message,
    });
  }
};

module.exports = { postImages, viewByid, getImages };
