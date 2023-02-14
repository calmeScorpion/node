const Image = require('../../model/image');
const fs = require('fs');
const multer = require('multer');

const getImage = (req, res, next) => {
  try {
    Image.find({}, (err, images) => {
      if (err) {
        console.error(err);
      } else {
        // Loop through each image object and read the file from the local file system
        images.forEach((image) => {
          fs.readFile(image.image, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              // Return the image data as a response to a request, for example
              res.contentType('image/jpg');
              // res.send(data);
              res.render('index', { images: [data] });
            }
          });
        });
      }
    });
  } catch (e) {
    res.json({
      msg: e.message,
    });
  }
  // Image.find({}, (err, images) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send('An error occurred', err);
  //   } else {
  //     res.send({ images });
  //     // res.render('index', { images });
  //   }
  // });
};

const getImageById = async (req, res, next) => {
  try {
    let image = await Image.findById(req.params.id);
    let data = fs.readFileSync(image.image);
    if (data) {
      res.set('Content-Type', 'image/jpeg');
      res.send(data);
    } else {
      console.log(err);
    }
  } catch (err) {
    res.json({
      success: 'false',
      msg: err.message,
    });
  }
};

const postImage = async (req, res, next) => {
  try {
    let image = await Image.create({
      name: req.body.name,
      image: req.file.path,
    });
    res.send(image.image);
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};

module.exports = { postImage, getImage, getImageById };
