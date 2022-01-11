var express = require("express");
var router = express.Router();
const moviesBL = require("./Models/moviesBL");
const newMoviesBL = require("./Models/newMoviesBL");
const dal = require("./DALs/newMoviesDAL");

// generate id for new movie by order
const getID = async function () {
  let reader = await dal.readFromFile();
  if (reader.data.length > 0) {
    return reader.data[reader.data.length - 1].id + 1;
  } else {
    let movies = await moviesBL.getMoviesData();
    return movies[movies.length - 1].id + 1;
  }
};

// get all genres and languages
const getGenresAndLangs = async function (choice) {
  let moviesData = await moviesBL.getMoviesData();
  let genres = [];
  let langs = [];

  moviesData.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (genres.indexOf(genre) == -1) {
        genres.push(genre);
      }
    });

    if (langs.indexOf(movie.language) == -1) {
      langs.push(movie.language);
    }
  });

  if (choice === "genres") return genres;
  else if (choice === "langs") return langs;
  else {
    console.log("enter genres/langs");
    return "err";
  }
};

module.exports = { getID, getGenresAndLangs };
