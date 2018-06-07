'use strict';

Profile.prototype.toHtml = function() {
    const profileCountTemplate = Handlebars.compile($('#profile-count-template').text());
    const profileListTemplate = Handlebars.compile($('#profile-list-template').text());

    return profileCountTemplate(this), profileListTemplate(this);
};