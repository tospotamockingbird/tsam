'use strict';

const indexView = {};

indexView.initResults = function() {
    // BirdData.all.forEach(function(result) {
    //     $('#species-selector').append(result.text());
    // });
}

// conflict is ok just combine

indexView.initIndexPage = function() {
  $('#add-sighting').on('click', newSighting.submit);
}

const newSighting = {};

function confirmBirdAdditon() {
  $('#add-sighting').on('click', function() {
     $('#add-confirmation').show();
  })
}

function knownBirdSubmit() {
  $('#list-button').on('click', function() {
    $('#discoverBird').show();
  })
}

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
  
  $(document).ready(function() {
    $('#add-confirmation').hide();
    $('#discoverBird').hide();
  })
  
confirmBirdAdditon();
knownBirdSubmit();
