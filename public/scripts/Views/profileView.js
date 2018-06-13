'use strict';

const profileView = {};

profileView.initIndexPage = function() {
    UserData.all.forEach(function(project) {
        $('#profile-list').append(project.toHtml());
      });
    }
