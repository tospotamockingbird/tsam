'use strict';

const profileView = {};

profileView.initIndexPage = function() {
    UserData.all.forEach(function(project) {
        $('#profile-list').append(project.toHtml());
      });
    }

function notSoFast() {
  alert("Not so fast, you saucy minx. Personalized accounts to come in beta 2.0!");
}
