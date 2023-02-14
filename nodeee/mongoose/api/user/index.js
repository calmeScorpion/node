var express = require('express');
var router = express.Router();

const { userValidationSchema } = require('./validator');
const {
  getUser,
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('./controller');
router
  .route('/auth/signup')
  .get(getUser)
  .post(userValidationSchema, createUser);
router.route('/auth/login').post(loginUser);
router.route('/auth/forgotpassword').post(forgotPassword);
router.route('/auth/reset-password/:token').post(resetPassword);

module.exports = router;
