const mongoose = require('mongoose');
const { Schema } = mongoose;

const multipleImage = new Schema({
  image: [
    {
      path: String,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model('multiple_image', multipleImage);
