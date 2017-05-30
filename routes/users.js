const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Question= require('../models/question');
const Answer= require('../models/answer');

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
    console.log(newQuestion.author);
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
router.get('/fetch', function(req, res){
    let query="How many suits did ironman build?";
   /* Question.fetchQuestions(function(err, question){
        if(err){
            res.json({success: false, msg: 'Answer could not be retrieved' });
        }
        else{
            console.log(question);
            res.json({success: true, msg: 'Answer retrieved successfully' });
        }
    });
    */
    Question.find( function(err, docs){
        console.log("Getting data from db");

        if (err) {
          console.log('error from mongodb', err);
          res.send('error retrieving data')
          
        } else {
          console.log('docs from mongodb', docs);
          res.json(docs);
          console.log("Returned data");
        }
    })
});



//Answer Question
router.post('/answer', function(req, res, next){
    let newAnswer = new Answer({
        questionid: req.body.questionid,
        answer:req.body.answer,
        answerer:req.body.answerer
       
    });
 console.log(newAnswer.questionid, newAnswer.answer, newAnswer.answerer);
    Answer.addAnswer(newAnswer, function(err, answer){
        if(err){
            res.json({success: false, msg: 'Failed to post Answer' });
        }
        else{
            res.json({success: true, msg: 'Answer posted successfully' });
        }
    });

});

//Fetch Answers
router.get('/answer', function(req, res){
    let query="How many suits did ironman build?";
   /* Question.fetchQuestions(function(err, question){
        if(err){
            res.json({success: false, msg: 'Answer could not be retrieved' });
        }
        else{
            console.log(question);
            res.json({success: true, msg: 'Answer retrieved successfully' });
        }
    });
    */
    Answer.find( function(err, docs){
        console.log("Getting data from db");

        if (err) {
          console.log('error from mongodb', err);
          res.send('error retrieving data')
          
        } else {
          console.log('docs from mongodb', docs);
          res.json(docs);
          console.log("Returned data");
        }
    })
});

//GET QUESTION BY ID
router.get('/retrieveQuestionById/:id', function(req, res){
    let query={ _id:req.params['id'] };
    console.log(query);
    Question.findOne(query, function(err, docs){
        console.log("Getting data from db");

        if (err) {
          console.log('error from mongodb', err);
          res.send('error retrieving data')
          
        } else {
          console.log('docs from mongodb', docs);
          res.json(docs);
          console.log("Returned data");
        }
    });
});


//GET ANSWERS BY QUESTION ID
router.get('/retrieveAnswerById/:id', function(req, res){
    let query={ questionid:req.params['id'] };
    console.log(query);
    Answer.find(query, function(err, docs){
        console.log("Getting data from db");

        if (err) {
          console.log('error from mongodb', err);
          res.send('error retrieving data')
          
        } else {
          console.log('docs from mongodb', docs);
          res.json(docs);
          console.log("Returned data");
        }
    });
});
