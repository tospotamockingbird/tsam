'use strict';

// renders the your birds list to profile.html
let userBirds = [];

function CreateUserBird (usersBirdData) {
    this.name = usersBirdData.name;
    this.imgURL = usersBirdData.imgURL;
    this.date = usersBirdData.date;
    this.location = usersBirdData.location;
}

function renderUserBirds() {
    userBirds.forEach(function(userBirds) {
        $('#profile-list').append(project.toHtml());
    });
}

CreateUserBird.prototype.toHtml = function() {
    const listTemplateFiller = Handlebars.compile($('#profile-list-template').html());
    const filledListTemplate = filledListTemplate(this);
    return filledListTemplate;
}

function runWhenDone (usersBirdData) {
    usersBirdData.forEach(item => userBirds.push(new CreateUserBird(item)));

    if(!localStorage.userBirds) {
        localStorage.setItem('userBirds', JSON.stringify(usersBirdData));
    }

    renderUserBirds();
}

function runWhenFails (err) {
    console.error('error: renderUserBirds', err);
}

if (!localStorage.userBirds) {
    $.ajax({
        type: 'GET',
        url: 'userData.json',
        success: runWhenDone,
        error: runWhenFails
    })
} else {
    const parsedUserBirdsData = JSON.parse(localStorage.userBirds);
    runWhenDone(parsedUserBirdsData);
}
