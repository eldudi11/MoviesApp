var express = require("express");
var router = express.Router();
const moviesBL = require("../Models/moviesBL");

router.get("/", async function (req, res, next) {
  let moviesData = await moviesBL.getMoviesData();

  //sort by movie name
  moviesData.sort(function (a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
  res.render("menu", { username: "", movies: moviesData });
});

module.exports = router;
