const express = require('express');
var router = express.Router();

const { getDocs, createDocs, updateOne } = require('./controller');

router.route('/').get(getDocs).post(createDocs);
router.route('/:id').patch(updateOne);

module.exports = router;
