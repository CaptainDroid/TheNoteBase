const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config= require('../config/database');

//User Schema

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    branch:{
        type: String,
        required:false
    },
    stuFac:{
        type: String,
        required:false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};


module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

//Add user function
module.exports.addUser= function(newUser, callback){
    
    bcrypt.genSalt(10, function(err, salt){
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
};