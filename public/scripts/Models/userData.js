'use strict';

function UserData (rawDataObj) {
    this.name = rawDataObj.name;
    this.imageURL = rawDataObj.imageURL;
    this.date = rawDataObj.date;
    this.location = rawDataObj.location;
};

UserData.all = [];

UserData.prototype.toHtml = function() {
    const profileListTemplate = Handlebars.compile($('#profile-list-template').text());
    return profileListTemplate(this);
};

UserData.loadAll = function(rawData) {
    rawData.forEach(function(userObject) {
    UserData.all.push(new UserData(userObject));
    })
};

// UserData.fetchAll = function() {
// if(localStorage.rawData){
//     var parsed = JSON.parse(localStorage.rawData);
//     UserData.loadAll(parsed);
//     profileView.initIndexPage();
// } else {
//     $.ajax({
//     dataType: 'json',
//     url: 'data/userData.json',
//     data: 'data',
//     success: function(data) {
//     localStorage.setItem("rawData", JSON.stringify(data));
//     UserData.loadAll(data);
//     profileView.initIndexPage();
//             }
//         });
//     };
// }
//
// UserData.fetchAll = callback => {
//         $.get('/profile'), {spotter: this.spotter}
//         .then(
//           results => {
//             UserData.loadAll(results);
//             callback();
//           }
//         )
//     };

function spotterRequest(spotterObj) {
  this.spotter = spotterObj.spotter;
}

spotterRequest.prototype.requestSpotter = function() {
    console.log('requesting spotters sightings', this.spotter)
    $.get('/profile', {spotter: this.spotter})
    .done(data => console.log(data))
    .fail(err => console.log(err));
};

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

// function deleterRequest(deleterObj) {
//   // this will be the creation of this.checkbox values
// }
//
// userSighting.prototype.insertSighting = function() {
//     $.get('/delete', {delete request : stuff from above})
//     .done(data => console.log(data))
//     .fail(err => console.log(err));
// };
