const mongoose = require('mongoose');
const { Schema } = mongoose;

const form = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z ]+$/.test(value);
      },
      message: 'Name must be only alphabets and spaces',
    },
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: 'Phone number must be 10 digits only',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      },
      message: 'Invalid email format',
    },
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 18;
      },
      message: 'Age must be above 18',
    },
  },
  start_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Start date should be a future date',
    },
  },
  end_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.start_date;
      },
      message: 'End date should be after start date',
    },
  },
  image: { type: Buffer, required: true },
});

module.exports = mongoose.model('user_form', form);
