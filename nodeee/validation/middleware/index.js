const multer = require('multer');

const imageStorage = multer.diskStorage({
  destination: 'public/images',

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      const err = new Error('Only .png, .jpg and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err, false);
    }
    cb(undefined, true);
  },
});

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ExtensionError') return res.json({ err: err.message });
  next(err);
};

module.exports = { upload, errorHandler };
