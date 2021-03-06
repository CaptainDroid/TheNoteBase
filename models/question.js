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
   // let queryString={question : query};
    Question.find(//callbackfunction(err, docs){
        /*console.log("Getting data from db");
        if (err) {
          console.log('error from mongodb', err);
          res.send('error retrieving data')
          // or however else you want to handle your error
        } else {
          console.log('docs from mongodb', docs);
          res.json(docs);
          console.log("Returned data");
        }
        
    }*/);
};