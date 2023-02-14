const express = require('express');
var router = express.Router();

const { getUser, postUser } = require('./constroller');

router.route('/').get(getUser).post(postUser);

module.exports = router;
