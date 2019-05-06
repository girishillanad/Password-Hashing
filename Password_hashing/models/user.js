const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const password = require('password-hash')
const md5 = require('js-md5');

//User Schema
const UserSchema = mongoose.Schema({

    name: {
        type:String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

//To access from outside
const User = module.exports = mongoose.model('User', UserSchema);

//To use function outside use module.exports
module.exports.getUserById = function(id, callback)
{
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(user,callback)
{
    const query = {username: user}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){

    //Will not generate same hash
    /*var hashed=password.generate(newUser.password);
    newUser.password=hashed;
    newUser.save();
    callback(null,"oh yeah");*/


    //Will generate same hash
    /*
    md5(newUser.password);
    var hash = md5.create();
    newUser.password=hash;
    newUser.save();
    console.log("register:"+newUser.password);
    callback(null,"oh yeah");*/

    //Will not generate same hash
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save();
        callback(null,"oh yeah");
      });
    });

    
}

module.exports.comparePassword = function(candidatePassword, in_db, callback){
    
/*
    md5(loginuser.password);
    var hash = md5.create();
    loginuser.password=hash;
    
   console.log(loginuser.password);
   console.log(in_db);
    if(loginuser.password === in_db)
    {
        callback(null,"yes");
    }
    else
    {
        callback(null,"no");
    }*/


    //not produce same hash
    
    bcrypt.compare(candidatePassword, in_db, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });

    

    
  }
