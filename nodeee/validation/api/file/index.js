const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
var router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Please upload a valid image'));
    }
    cb(undefined, true);
  },
});




router.post('/file', upload.single('image'), async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  const image = new Image({
    name: req.body.name,
    image: buffer,
    contentType: 'image/png',
  });

  try {
    await image.save();
    res.status(201).send(image);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
