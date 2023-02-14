const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

ImageSchema.pre('save', async function () {
  const image = await sharp(this.image).metadata();

  if (image.width > 1000 || image.height > 1000) {
    throw new Error('Image size should not exceed 1000x1000 pixels');
  }

  if (!['image/jpeg', 'image/png', 'image/gif'].includes(this.contentType)) {
    throw new Error('Invalid image type');
  }
});

const File = mongoose.model('Image', ImageSchema);

module.exports = File;
