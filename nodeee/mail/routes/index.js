var express = require('express');
require('dotenv').config();
var router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const emailExistence = require('email-existence');
router.use(bodyParser.json());

const sendEmail = require('../module/email/send_mail');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-email', sendEmail);

module.exports = router;
