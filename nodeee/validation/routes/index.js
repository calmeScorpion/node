var express = require('express');
var router = express.Router();

const formRouter = require('../api/form/index');
const imageRouter = require('../api/image_upload/index');
const fileRouter = require('../api/file/index');
const multipleRouter = require('../api/multiple_images/index');
/* GET home page. */
router.use('/user', formRouter);
router.use('/image', imageRouter);
router.use('/multi', multipleRouter);

module.exports = router;
