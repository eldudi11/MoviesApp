const mongoose = require('mongoose');



let userSchema = new mongoose.Schema({

    Username : String,
    Password : String
});

module.exports = mongoose.model('users',userSchema);