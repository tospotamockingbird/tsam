'use strict';

function UserData (rawDataObj) {
    this.name = rawDataObj.name;
    this.imageURL = rawDataObj.imageURL;
    this.date = rawDataObj.date;
    this.location = rawDataObj.location;
 };

UserData.all = [];

function userSighting(sightingObj) {
  this.species = sightingObj.species;
  this.zip = sightingObj.zip;
  this.date = sightingObj.date;
};

userSighting.all = [];

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

userSighting.prototype.insertSighting = function(callback) {
    $.post('/sighting', {species: this.species, zip: this.zip, date: this.date})
    .done(data => console.log(data))
    .fail(err => console.log(err));
};
