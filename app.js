const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/database');

//Initialize the app variable with ExpressJS
const app = express();
//PORT Number
const port = 3000;

//Connect to mongoose database
mongoose.connect(config.database);

//Successful connection
mongoose.connection.on('connected', function(){
    console.log("Connected to " + config.database);
});

//Error on connecting to database
mongoose.connection.on('error', function(err){
    console.log('Error in connection '+ err);
});

//Storing all the users modules in a separate folder called routes/users
const users = require('./routes/users');

//CORS Middleware, enables different technologies to run on the sane port
app.use(cors());

// Set Static folder (Place where all the client side files are stored, i.e Angular files)
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware, extracts data from forms and other bodies
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//import passport.js file from config/passport
require('./config/passport')(passport); //(passport) because we're passing an object in the module.exports function in the passport.js file

//URL with /users will use the variable 'users' path
app.use('/users', users);

//Index Page
/*app.get('/', function(req, res){
    res.send("Hello!");
}); */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port , function(){
    console.log("server started on port "+port);
});
