'use strict';

const indexView = {};

indexView.initIndexPage = function() {
  $('#add-sighting').on('click', newSighting.submit);
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
