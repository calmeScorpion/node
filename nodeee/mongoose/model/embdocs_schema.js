const { Schema, model } = require('mongoose');

var Comments = new Schema({
  title: String,
  body: String,
});

var BlogPost = new Schema({
  title: String,
  date: Date,
  comments: [Comments],
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = model('embdocs', BlogPost);
