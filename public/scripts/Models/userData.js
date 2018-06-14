'use strict';

function UserData (rawDataObj) {
    this.name = rawDataObj.name;
    this.imageURL = rawDataObj.imageURL;
    this.date = rawDataObj.date;
    this.location = rawDataObj.location;
 };

UserData.all = [];

UserData.prototype.toHtml = function() {
    // const profileCountTemplate = Handlebars.compile($('#profile-count-template').text());
    const profileListTemplate = Handlebars.compile($('#profile-list-template').text());

    return profileListTemplate(this);
    // profileCountTemplate(this),
};

UserData.loadAll = function(rawData) {
    rawData.forEach(function(userObject) {
      UserData.all.push(new UserData(userObject));
    })
  };

UserData.fetchAll = function() {
if(localStorage.rawData){
    var parsed = JSON.parse(localStorage.rawData);
    UserData.loadAll(parsed);
    profileView.initIndexPage();
} else {
    $.ajax({
    dataType: 'json',
    url: 'data/userData.json',
    data: 'data',
    success: function(data) {
    localStorage.setItem("rawData", JSON.stringify(data));
    UserData.loadAll(data);
    profileView.initIndexPage();
            }
        });
    };
}

// UserData.fetchAll = callback => {
//         $.get('/profile')
//         .then(
//           results => {
//             UserData.loadAll(results);
//             callback();
//           }
//         )
//     };

function userSighting(sightingObj) {
  this.spotter = sightingObj.spotter;
  this.birdID = sightingObj.birdID;
  this.species = sightingObj.species;
  this.zip = sightingObj.zip;
  this.date = sightingObj.date;
};


userSighting.prototype.insertSighting = function() {
    $.post('/sighting', {spotter: this.spotter, birdID: this.birdID, species: this.species, zip: this.zip, date: this.date})
    .done(data => console.log(data))
    .fail(err => console.log(err));
};
