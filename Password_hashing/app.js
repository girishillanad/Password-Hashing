const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


//Mongoose Connection 
mongoose.connect(config.database);
mongoose.connection.on('connected',() =>{

    console.log('Connected to database')


})


//Important
const app=express();
const users=require('./routes/users');
const port=8080;
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

app.use('/users',users);

app.get('',function(req,res)
{

    res.send("Peter Parker");

})

//Server initialization
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});