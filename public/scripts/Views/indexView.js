'use strict';

const indexView = {};

indexView.initResults = function() {
    // BirdData.all.forEach(function(result) {
    filterResults.forEach(function(result) {
        $('#filter-results').append(result.toHtml());
    });
}
