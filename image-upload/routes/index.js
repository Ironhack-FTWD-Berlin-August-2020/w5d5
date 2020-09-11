const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { uploader, cloudinary } = require('../config/cloudinary.js')

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('index', { movies });
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
})

router.post('/movie/add', uploader.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  // cloudinary information
  const imgName = req.file.originalname;
  const imgPath = req.file.url;
  const imgPublicId = req.file.public_id;

  Movie.create({ title, description, imgName, imgPath, imgPublicId })
    .then(movie => {
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => {
      // if the movie has an imgPath then delete the image on cloudinary
      if (movie.imgPath) {
        cloudinary.uploader.destroy(movie.imgPublicId);
      }
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});


module.exports = router;