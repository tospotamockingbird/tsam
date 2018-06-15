'use strict';
const profileView = {};

profileView.initIndexPage = function() {
    $('#get-spotter').on('click', newSpotter.submit);

    UserData.all.forEach(function(project) {
      $('#profile-list').append(project.toHtml());
    });
  };

const newSpotter = {};

newSpotter.submit = function(event) {
  let spotter = new spotterRequest({
    spotter: $('#spotter-input').val().toUpperCase()
    });
  spotter.requestSpotter();
};
