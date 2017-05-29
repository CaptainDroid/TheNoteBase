const mongoose= require('mongoose');
const config = require('../config/database');

//Question Schema

const QuestionSchema= mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    author:{
        type: Object,
        required: true
    },
    slug:{
        type:String,
        required:false
    } 
});

const Question = module.exports= mongoose.model('Question', QuestionSchema);

module.exports.addQuestion = function(newQuestion, callback){
    newQuestion.save(callback);
};

module.exports.fetchQuestions = function(callback){
    let query={question:"How many suits did ironman build?"}
    Question.findOne(query, callback);
};