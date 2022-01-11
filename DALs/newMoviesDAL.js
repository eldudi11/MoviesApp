const { json } = require('express');
const jsonfile = require('jsonfile');

exports.writeToFile = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/newMovies.json", obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created!')
            }
        })
    });
 
}

exports.readFromFile = function()
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/newMovies.json", function(err,obj)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(obj);
            }
        })
    });
  
}


