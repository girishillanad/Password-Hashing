const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


//Register
router.post('/register',(req,res,next) =>{

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    
User.getUserByUsername( newUser.username,(err,user)=>{
        if(user)
        {
            return res.status(200).json({
                status: 'unique',
                data: user
            })
        }
        else
        {
            //For user not found
            User.addUser(newUser, (err , user)=>{
                if(err)
                {
                    return res.status(200).json({
                        status: 'error',
                        data: user
                    })
                }
                else
                {
                    return res.status(200).json({
                        status: 'success',
                        data: user
                    })
                }
            })
        }
    })
});

//Authenticate
router.post('/login',(req,res,next) =>{
   
    const username = req.body.username;
    const password = req.body.password;


    let loginnewUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.getUserByUsername(loginnewUser.username, (err, user)=>{
        if(err)
        {
            throw err;
        }
        if(!user)
        {
            
            return res.status(200).json({
                status: 'not_found',
                data: user
            })
        }
        else
        { 
            User.comparePassword(loginnewUser.password, user.password, (err, isMatch)=>{

                //Reason y cant we use this: Because everytime hash value for same word is different
                
               /* if( isMatch === "yes" )
                {
                    return res.status(200).json({
                        status: 'success',
                        data: user
                    })
                }
                else
                {
                    return res.status(200).json({
                        status: 'wrong_pass',
                        data: user
                    })
                }*/
                
                if(isMatch)
                {
                    return res.status(200).json({
                        status: 'success',
                        data: user
                    })
                }
                else
                {
                    return res.status(200).json({
                        status: 'wrong_pass',
                        data: user
                    })
                }

            });
        }
    });
});

//Profile
router.get('/profile',(req,res,next) =>{
    res.send('Profile');
});


module.exports=router;  //for error Router.use()