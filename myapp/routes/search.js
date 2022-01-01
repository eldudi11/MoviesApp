var express = require('express');
const jsdom = require('jsdom');
const utils = require('../utils');
const { move } = require('.');
var router = express.Router();
const moviesBL = require('../Models/moviesBL');
const newMoviesBL = require('../Models/newMoviesBL');


router.get('/',async function(req, res, next) {

  let moviesData = await moviesBL.getMoviesData();
  let genres = [];
  let langs = [];

  moviesData.forEach(movie =>{
    movie.genres.forEach(genre =>{
      if(genres.indexOf(genre) == -1)
      {
        genres.push(genre);
      }
    });

    if(langs.indexOf(movie.language) == -1)
    {
      langs.push(movie.language);
    }
  });
  

  res.render('search',{genres : genres, langs : langs});
});
  

router.post('/getdata',async function(req, res, next)
 {

    let moviesData = await moviesBL.getMoviesData();

    let lang =  req.body.language;
    let name = req.body.name.toLowerCase();
    let genre = req.body.genre;

    let matches = [];
    let isFit = true;

    moviesData.forEach(movie =>{

      if(movie.name.toLowerCase().indexOf(name) == -1)
      {
        isFit = false;
      }
      
      else if(genre != "" || lang != "")
      {
        if(genre != "")
        {
          movie.genres.forEach(g =>{
            isFit = false;
            if(g == genre)
            {
             isFit = true;
            }
          });
        }
        if(isFit == true && lang != "" && movie.language != lang)
        {
          isFit = false;
        }
        
      }
      if(isFit == true)
        matches.push(movie);

      isFit = true;
      
    });

   res.render('results',{movies : matches});
});

router.get('/getmovie/:id',async function(req, res, next)
 {

    let moviesData = await moviesBL.getMoviesData();
    let id = req.params.id;
    let movie = moviesData.find(x => (x.id == id));

    // convert html string to html
    const dom = new jsdom.JSDOM(movie.summary);
    movie.summary = dom.window.document.querySelector("html").textContent;
    
    res.render('movieData',{movie : movie});

    
    
});


module.exports = router;


