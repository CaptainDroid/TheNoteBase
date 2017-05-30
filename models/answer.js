const mongoose= require('mongoose');
const config = require('../config/database');

//Answer Schema

const AnswerSchema= mongoose.Schema({
    questionid:{
        type: String,
        required:false
    },
    answer:{
        type: Object,
        required: false
    },
    answerer:{
        type:Object,
        required:false
    } 
});

const Answer = module.exports= mongoose.model('Answer', AnswerSchema);

module.exports.addAnswer = function(newAnswer, callback){
    newAnswer.save(callback);
};

module.exports.fetchAnswer = function(callback){
   // let queryString={question : query};
    Answer.find(//callbackfunction(err, docs){
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