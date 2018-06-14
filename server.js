'use strict'

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://taylor@localhost:5432/tsam'; // TODO: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public') );

loadDB();

app.get('/', function(request, response){
    response.sendFile('./public/index.html');
});

app.post('/sighting', function(request, response){
  client.query(`
      INSERT INTO sightings(spotter, birdID, species, zip, date)
      SELECT $1, $2, $3, $4, $5
      `,
      [
        request.body.spotter,
        request.body.birdID,
        request.body.species,
        request.body.zip,
        request.body.date
      ]
    )
    .then(() => response.send('Update complete'))
    .catch(err => console.log(err));
  })


app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`);
});

/////////////////////////////////
/////// DATABASE LOADERS ///////
///////////////////////////////
function loadBirds() {
  fs.readFile('./public/data/birdData.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        'INSERT INTO birds(birdID, "name") VALUES($1, $2) ON CONFLICT DO NOTHING',
        [ele.birdID, ele.name]
      )
      .catch(console.error);
    })
  })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    birds (
      birdID VARCHAR(255) UNIQUE NOT NULL,
      "name" VARCHAR (255)
    );`
    ).then(loadBirds)
    .catch(console.error);

  client.query(`
      CREATE TABLE IF NOT EXISTS
      sightings (
        id SERIAL,
        spotter VARCHAR(255) NOT NULL,
        birdID VARCHAR(255) NOT NULL,
        species VARCHAR(255) NOT NULL,
        zip INTEGER NOT NULL,
        date DATE NOT NULL
      );`
    )
    .catch(console.error);
};
