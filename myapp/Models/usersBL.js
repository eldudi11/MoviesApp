const User = require('../DALs/userModel');

const getUsers = function()
{
    return new Promise((resolve,reject) =>
    {
        User.find({ }, function(err,users)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(users);
            }
        })
    })
}


const createPerson = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        const newUser = new User({
            Username : obj.username,
            Password : obj.password
            
        });
    
        newUser.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('OK');
            }
        })
    })
}

module.exports = {createPerson, getUsers};