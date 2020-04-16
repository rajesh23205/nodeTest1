const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const api = require('./server/routes/api');
var mongoUtil = require( './server/mongoUtil' );
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/fagli';
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(path.join(__dirname, 'dist/fagli')));

// const uri = 'mongodb://localhost:27017/fagli';
// global.db = mongoose.createConnection(uri);

// global.db = mongoose.createConnection(uri);
//data base connection
mongoUtil.connectToServer();
const api = require('./server/routes/api');
//  function( err, client ) {
//   if (err) console.log("DB connection error" +err);
//   console.log("DB Connection created successfully!");
// } );

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', api);
app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname,'dist/fagli/index.html'));
})

app.listen(port, function(){
    console.log("Listen to port "+ port);
})

//https://www.youtube.com/watch?v=e1LaekAnVIM
