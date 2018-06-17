'use strict';

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
    if (localStorage.birdData) {
        const parsedBirdData = JSON.parse(localStorage.birdData);
        BirdData.loadAll(parsedBirdData);
        indexView.initResults();
    } else {
        $.ajax({
            url: '../../data/birdData.json',
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

BirdData.filterOnColor = function(data) {
    return !Array.isArray(data.color);
}

BirdData.showBirdList = function() {
    const form = document.getElementById('filter');
    const birdSize = form.size.value;
    const birdBehavior = form.behavior.value;
    const birdHabitat = form.habitat.value;

    const birdColors = $('input[name="color"]:checked');
    const selectedColors = birdColors.map(function() {
        return this.value;
    }).get();

    console.log(selectedColors);

    const filteredBirds = BirdData.all
        .filter(data => data.size === birdSize || data.size.includes(birdSize) || birdSize == '')
        .filter(data => {
            if (Array.isArray(data.color)) {
                return data.color.reduce((colorFound, color) => selectedColors.includes(color) || colorFound, false);
            } else {
                return selectedColors.includes(data.color);
            }
        })
        .filter(data => data.behavior === birdBehavior || data.behavior.includes(birdBehavior) || birdBehavior == '')
        .filter(data => data.habitat === birdHabitat || data.habitat.includes(birdHabitat) || birdHabitat == '')

    console.log(filteredBirds);

    $('#filter-results').empty();
    filteredBirds.forEach(function(result) {
        $('#filter-results').append(result.toHtml());
    });
}



BirdData.buildBirdList();
