// Initialize and add the map
function initMap() {
  // The location of Portland, OR
  var portland = {lat: 45.5122, lng: -122.6587};
  // The map, centered at var portland
  var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 11,
        center: portland,
        mapTypeId: 'terrain',
        styles: [
          {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": "32"
                  },
                  {
                      "lightness": "-3"
                  },
                  {
                      "visibility": "on"
                  },
                  {
                      "weight": "1.18"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": "-70"
                  },
                  {
                      "lightness": "14"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": "100"
                  },
                  {
                      "lightness": "-14"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": "12"
                  }
              ]
          }
      ]
    });
  // The marker, positioned at Oregon
  // var marker = new google.maps.Marker({position: oregon, map: map});
}

var GMAPS_KEY = config.GMAPS_KEY
const scriptMaker = () => {
  let gmapScript = "<script async defer src='https://maps.googleapis.com/maps/api/js?key=";
  gmapScript += GMAPS_KEY;
  gmapScript += "&callback=initMap'></script>"
  $("#scripts").append(gmapScript);
}
scriptMaker();
