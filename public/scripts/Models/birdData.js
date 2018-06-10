'use strict';

// filters potential birds results

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

    // BirdData.fetchAll();

   const resultsTemplate = Handlebars.compile($('#filter-results-template').text());

   return resultsTemplate(this);
};

BirdData.loadAll = function(rawData) {
    rawData.forEach(function(birdObject) {
        BirdData.all.push(new BirdData(birdObject));
    })
};

BirdData.fetchAll = function() {
    if (localStorage.rawData) {
        const parsedBirdData = JSON.parse(localStorage.rawData);
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

// BirdData.fetchAll();
