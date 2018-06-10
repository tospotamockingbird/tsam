'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = process.env.PORT || 3000;

app.use(express.static('./public') );

app.get('/', function(request, response){
    response.sendFile('./public/index.html');
});

// app.post('/articles', bodyParser, function(request, response) {
//     // REVIEW: This route will receive a new article from the form page, new.html,
//     // and log that form data to the console. We will wire this up soon to actually
//     // write a record to our persistence layer!
//     console.log(request.body);
//     response.send('Record posted to server!!');
//   })

app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`);
});