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

// const newDeleter = {};
//
// deleters.submit = function(event) {
//   let deleters = new deleterRequest({
//     spotter: $('#spotter-input').val().toUpperCase() this will be all values of checked boxes
//     });
//   spotter.requestSpotter();
// };
