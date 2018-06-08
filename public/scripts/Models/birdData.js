'use strict';

let userBirds = [];

function CreateUserBirds (userData) {
    this.species = userData.species;
    this.imgFilepath = userData.imgFilepath;
    this.date = userData.date;
    this.location = userData.location;
}

function renderUserBirds() {
    userBirds.forEach(function(userBirds) {
        $('#').append(project.toHtml()); // add id from profile.html
    });
};

CreateUserBirds.prototype.toHtml = function() {
    
}