var express = require("express");
var router = express.Router();
const moviesBL = require("../Models/moviesBL");
const newMoviesBL = require("../Models/newMoviesBL");
const utils = require("../utils");

router.get("/", async function (req, res, next) {
  let allGenres = await utils.getGenresAndLangs("genres");
  res.render("createMovie", { genres: allGenres, errMsg: "" });
});

router.post("/", async function (req, res, next) {
  let moviesData = await moviesBL.getMoviesData();
  let allGenres = await utils.getGenresAndLangs("genres");
  let inputName = req.body.name;
  let inputLanguage = req.body.language;
  let inputGenre = req.body.genre;

  console.log("its said" + inputGenre);

  if (inputName === "" || inputGenre === "" || inputLanguage === "") {
    res.render("createMovie", {
      genres: allGenres,
      errMsg: "Please fill all the fields",
    });
  }
  if (
    moviesData.find((x) => x.name.toLowerCase() === inputName.toLowerCase()) !==
    undefined
  ) {
    res.render("createMovie", {
      genres: allGenres,
      errMsg: "Movie Name is exist",
    });
  }

  let obj = {
    id: await utils.getID(),
    name: req.body.name,
    language: req.body.language,
    genre: req.body.genre,
  };

  let result = await newMoviesBL.createMovie(obj);

  res.redirect("/menu");
});

module.exports = router;
