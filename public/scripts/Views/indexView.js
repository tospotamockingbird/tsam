'use strict';
const indexView = {};

indexView.initIndexPage = function() {
  $('#add-sighting').on('click', newSighting.submit);
}

const newSighting = {};

newSighting.submit = function(event) {
    event.preventDefault();
    let sighting = new userSighting({
      spotter: $('#spotter').val().toUpperCase(),
      birdID: $('#species-selector option:selected').val(),
      species: $('#species-selector option:selected').text(),
      zip: $('#zip').val(),
      date: $('#date').val()
    });
    sighting.insertSighting();
};
