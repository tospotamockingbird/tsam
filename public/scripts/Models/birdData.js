'use strict';

BirdData.all = [];
const filterResults = [];

// shows potential birds results

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
        $.getJSON({
            url: 'data/birdData.json',
            data: 'data',
            success: function(data) {
                localStorage.setItem("birdData", JSON.stringify(data));
                BirdData.loadAll(data);
                indexView.initResults();
            },
            error: function() {
                console.log('error');
            }
        })
    };
};

BirdData.buildBirdList = function() {
    const listButton = document.getElementById("list-button");
    
    listButton.addEventListener("click", BirdData.showBirdList);
}

BirdData.showBirdList = function() {
    BirdData.all.forEach(function(result) {
        $('#filter-results').append(result.toHtml());
    });
    console.log('listening');
}

BirdData.buildBirdList();
