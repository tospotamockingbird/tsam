'use strict';
const indexView = {};

indexView.initIndexPage = function() {
  $('#add-sighting').on('click', newSighting.submit);

indexView.initResults = function() {
    // BirdData.all.forEach(function(result) {
    //     $('#species-selector').append(result.text());
    // });
}

const newSighting = {};

newSighting.submit = function(event) {
    event.preventDefault();
    let sighting = new userSighting({
      species: $('#species').val(),
      zip: $('#zip').val(),
      date: $('#date').val(),
    });
    sighting.insertSighting();
};
