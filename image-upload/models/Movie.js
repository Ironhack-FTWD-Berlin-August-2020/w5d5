const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  title: String,
  description: String,
  imgName: String,
  imgPath: String,
  imgPublicId: String
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
