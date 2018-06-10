'use strict';

const indexView = {};

indexView.initResults = function() {
    BirdData.fetchAll.forEach(function(result) {
        $('#filter-results').append(result.toHtml());
    });
}