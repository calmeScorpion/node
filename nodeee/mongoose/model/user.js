const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const user = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    salt: String,
    accessToken: String,
  },
  { timestamps: true }
);

user.statics.generateSalt = async () => {
  return await bcrypt.genSalt();
};

user.statics.hashPassword = async (pass, salt) => {
  return await bcrypt.hash(pass, salt);
};

user.statics.verifyPassword = async (pass, hash, salt) => {
  const hashPassword = await bcrypt.hash(pass, salt);
  if (hashPassword === hash) return true;
  else return false;
};

user.statics.generateAuthTocken = (data) => {
  let expiresIn = expireIn(10);
  if (data.rememberMe) {
    console.log('entered---');
    expiresIn = expireIn(720);
  }

  return jwt.sign(
    {
      id: data._id,
      email: data.email,
      validity: data.password.concat(data._id).concat(data.email),
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

const expireIn = (numDays) => {
  const dateObject = new Date();
  return dateObject.setMinutes(dateObject.getMinutes() + numDays);
};

module.exports = mongoose.model('user', user);
