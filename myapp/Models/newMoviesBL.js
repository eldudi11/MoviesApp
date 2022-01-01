const dal = require('../DALs/newMoviesDAL')

const createMovie = async function(obj)
{
    try
    {
       let reader = await dal.readFromFile();
       if(reader.data)
       {
        reader.data.push(obj);
       }
    
     //   console.log(reader);
        
        let result = await dal.writeToFile(reader);
        return result;
    }
    catch(err)
    {
        return(err)
    }
    
}

module.exports = {createMovie}