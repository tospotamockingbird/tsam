'use strict';

function UserData (rawDataObj) {
  this.id = rawDataObj.id;
  this.spotter = rawDataObj.spotter;
  this.birdID = rawDataObj.birdid;
  this.species = rawDataObj.species;
  this.zip = rawDataObj.zip;
  this.date = rawDataObj.date;
};

UserData.all = [];

UserData.prototype.toHtml = function(data) {
    var template = Handlebars.compile($('#profile-list-template').text());
    var profileListTemplate = template(data);
    return profileListTemplate;
};

UserData.loadAll = function(rawData) {
    rawData.forEach(function(userObject) {
    UserData.all.push(new UserData(userObject));
    })
};

function spotterRequest(spotterObj) {
  this.spotter = spotterObj.spotter;
}

spotterRequest.prototype.requestSpotter = function() {
    $.get('/profile', {spotter: this.spotter})
    .done(data => {
      UserData.loadAll(data);
      profileView.appendData();
    })
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

const requestDeleter = function(sightingIds) {
  $.ajax({
    url: '/sightings?ids='+sightingIds.join(','),
    type: 'DELETE',
    success: data => console.log(data),
  })
  .fail(err => console.log(err));
};
