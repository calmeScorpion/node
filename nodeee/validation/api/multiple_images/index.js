const express = require('express');
const router = express.Router();

const { upload } = require('../../middleware/index');
const { postImages, viewByid, getImages } = require('./controller');

router.route('/').post(upload.array('file'), postImages).get(getImages);
router.route('/:id').get(viewByid);

module.exports = router;
