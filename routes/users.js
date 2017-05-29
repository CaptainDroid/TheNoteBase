const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Question= require('../models/question');

//Register
router.post('/register', function(req, res, next){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        branch: req.body.branch,
        stuFac: req.body.stuFac
    });

    User.addUser(newUser, function(err, user){
        if(err){
            res.json({success: false, msg: 'Failed to register user' });
                }
        else{
            res.json({success: true, msg: 'User registered Successfully' });
        }
    });
});

//Authenticate
router.post('/authenticate', function(req, res, next){
    const username = req.body.username;
    let password = req.body.password;
    
    if(password == undefined)
    {
        password="";
    }

    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return res.json({ success: false, msg: 'User not found!'});
                }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week worth of seconds
                });

            res.json({
                success: true,
                token: 'JWT '+token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    branch: user.branch,
                    stuFac: user.stuFac
                     }    
                });
            }
            else{
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        })
    });
});

//Profile
router.use('/profile',passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.json({user: req.user});
});

module.exports = router;

//Ask Question
router.post('/ask', function(req, res, next){
    let newQuestion = new Question({
        question: req.body.question,
        author:req.body.author,
        //slug: pass
    });

    Question.addQuestion(newQuestion, function(err, question){
        if(err){
            res.json({success: false, msg: 'Failed to post Question' });
        }
        else{
            res.json({success: true, msg: 'Question posted successfully' });
        }
    });

});

//Fetch Questions
/*
router.get('/fetch', function(req, res){
    Question.fetchQuestion("How many suits did ironman build?",function(err){
        if(err){
            res.json({success: false, msg: 'Failed to post Question' });
        }
        else{
            res.json({success: true, msg: 'Question posted successfully' });
        }
    });
});
*/