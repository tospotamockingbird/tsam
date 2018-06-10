'use strict';

// shows potential birds results

BirdData.all = [];

function BirdData(birdDataObj) {
    this.birdID = birdDataObj.birdID;
    this.name = birdDataObj.name;
    this.habitat = birdDataObj.habitat;
    this.color = birdDataObj.color;
    this.size = birdDataObj.size;
    this.behavior = birdDataObj.behavior;
    this.image = birdDataObj.image;    
};

BirdData.prototype.toHtml = function() {
   const resultsTemplate = Handlebars.compile($('#filter-results-template').text());

   return resultsTemplate(this);
};

BirdData.loadAll = function(rawBirdData) {
    rawBirdData.forEach(function(birdObject) {
        BirdData.all.push(new BirdData(birdObject));
    })
};

BirdData.fetchAll = function() {
    if (localStorage.rawBirdData) {
        const parsedBirdData = JSON.parse(localStorage.rawBirdData);
        BirdData.loadAll(parsedBirdData);
        indexView.initResults();
    } else {
        $.ajax({
            dataType: 'json',
            url: 'data/birdData.json',
            data: 'data',
            success: function(data) {
                localStorage.setItem("birdData", JSON.stringify(data));
                BirdData.loadAll(data);
                indexView.initResults();
            }
        });
    };
};
