var express = require('express');
var router = express.Router();
const moviesBL = require('../Models/moviesBL');
const newMoviesBL = require('../Models/newMoviesBL');
const utils = require('../utils');
const usersBL = require('../Models/usersBL');



router.get('/',function(req, res, next) {
  res.render('createUser');
});

router.post('/getdata',async function(req, res, next) {

  let result = await usersBL.createUser(req.body);
  
  res.redirect('/login');
});



module.exports = router;
