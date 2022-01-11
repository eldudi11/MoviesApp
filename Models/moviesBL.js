const moviesDAL = require('../DALs/moviesDAL');

const getMoviesData = async function()
{
    let finalData = [];

    let resp = await moviesDAL.getMovies();
    let moviesArr = resp.data;

    moviesArr.forEach(x => {

        let movieData = {id : x.id, name : x.name, genres : x.genres, language : x.language, image : x.image.medium, premiered : x.premiered, summary : x.summary};
        finalData.push(movieData);
        
    });
   
    return finalData;
}

module.exports = {getMoviesData};