var express = require('express');
var router = express.Router();
const usersBL = require('../Models/usersBL');

router.get('/', function(req, res, next) {
  res.render('login',{ messege : ''});
});

router.post('/login',async function(req, res, next) {
  
  let username = req.body.username;
  let password = req.body.password;

  let users = await usersBL.getUsers();
  let messege;

  const found = users.find(x => x.Username === username);
  console.log(found);
  if(found === undefined)
  {
    messege = "username doesnt exist";
    res.render('login',{messege : messege}) 
  }
  else if(found.Password != password)
  {
    messege = "incorrect password";
    res.render('login',{messege : messege}) 
  }
  else
  {
    res.render('menu', {username : found.Username})
  }
  
});

module.exports = router;
