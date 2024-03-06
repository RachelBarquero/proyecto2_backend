const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video = new Schema({
  name: { type: String },
  link: { type: String },
  user: {type: String}
});

module.exports = mongoose.model('videos', video);