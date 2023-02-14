const express = require('express');
var router = express.Router();

const { getImage, postImage, getImageById } = require('./controller');
const { nameValidation } = require('./validator');
const { upload } = require('../../middleware/index');

router
  .route('/')
  .post(upload.single('file'), nameValidation, postImage)
  .get(getImage);
router.route('/:id').get(getImageById);
module.exports = router;
