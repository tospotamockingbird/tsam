'use strict';

function UserData (rawDataObj) {
    this.name = rawDataObj.name;
    this.imageURL = rawDataObj.imageURL;
    this.date = rawDataObj.date;
    this.location = rawDataObj.location;
 };

UserData.all = [];

UserData.prototype.toHtml = function() {
    const profileListTemplate = Handlebars.compile($('#profile-list-template').text());
    return profileListTemplate(this);
};

UserData.loadAll = function(rawData) {
    rawData.forEach(function(userObject) {
    UserData.all.push(new UserData(userObject));
    })
  };

UserData.fetchAll = function() {
if(localStorage.rawData){
    var parsed = JSON.parse(localStorage.rawData);
    UserData.loadAll(parsed);
    profileView.initIndexPage();
} else {
    $.ajax({
    dataType: 'json',
    url: 'data/userData.json',
    data: 'data',
    success: function(data) {
    localStorage.setItem("rawData", JSON.stringify(data));
    UserData.loadAll(data);
    profileView.initIndexPage();
            }
        });
    };
}