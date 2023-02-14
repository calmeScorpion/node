const mongoose = require('mongoose');
const { Schema } = mongoose;

const image = new Schema({
  name: String,
  image: {
    type: String,
    contentType: String,
    required: true,
  },
});

module.exports = mongoose.model('image_upload', image);
