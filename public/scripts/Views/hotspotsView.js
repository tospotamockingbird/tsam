// Initialize and add the map, then add sighting markers when the ajax calls are both complete
function initMap() {
  var portland = {lat: 45.5122, lng: -122.6587};
  var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 10,
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

// when both ajax calls are complete
    $.when(
      $.ajax(oregon),
      $.ajax(washington)
    )
    .done( (oregon, washington) => {
// concat the two arrays and assign the new array to orWA
      let orWA = oregon[0].concat(washington[0]);
// for each object, create a location, drop a marker, create infowindow and its content, assign click handlers
      orWA.forEach( bird => {
        let location = {lat: bird.lat, lng: bird.lng};
        let marker = new google.maps.Marker({position: location, map: map});
        let contentString = `<div class="info-window"><h4>${bird.comName}</h4><strong>Location: </strong>${bird.locName}<br><strong>Date: </strong>${bird.obsDt}<br><strong>Count: </strong>${bird.howMany}`;
        let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        map.addListener('dragend', function() {
              infowindow.close();
            });
        })
    });
};

// production-only
var GMAPS_KEY = config.GMAPS_KEY
const scriptMaker = () => {
  let gmapScript = "<script async defer src='https://maps.googleapis.com/maps/api/js?key=";
  gmapScript += GMAPS_KEY;
  gmapScript += "&callback=initMap'></script>"
  $("#scripts").append(gmapScript);
}
scriptMaker();
