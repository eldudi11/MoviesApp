const axios = require('axios');

const getMovies = function()
{
    return axios.get("https://api.tvmaze.com/shows");
}

module.exports = {getMovies};