var express = require('express');
var router = express.Router();
const moviesBL = require('../Models/moviesBL');
const newMoviesBL = require('../Models/newMoviesBL');
const utils = require('../utils');



router.get('/',async function(req, res, next) {
  let allGenres = await utils.getGenresAndLangs("genres");
  res.render('createMovie', {genres : allGenres});
});

router.post('/getdata',async function(req, res, next) {

  let moviesData = await moviesBL.getMoviesData();
  

  let obj = { id : await utils.getID(),
              name : req.body.name,
              language : req.body.language,
              genre : req.body.genre 
  };

  let result = await newMoviesBL.createMovie(obj);

  res.redirect('/menu');
});



module.exports = router;
