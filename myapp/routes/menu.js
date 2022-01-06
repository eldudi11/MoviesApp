var express = require("express");
var router = express.Router();
const moviesBL = require("../Models/moviesBL");

router.get("/", async function (req, res, next) {
  let moviesData = await moviesBL.getMoviesData();
  let names = [];
  if (moviesData) {
    names = moviesData.map((x) => {
      return x.name;
    });
  }

  res.render("menu", { username: "", movies: names.sort() });
});

module.exports = router;
