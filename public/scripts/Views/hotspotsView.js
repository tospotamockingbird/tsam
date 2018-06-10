// Initialize and add the map
function initMap() {
  // The location of Portland, OR
  var portland = {lat: 45.5122, lng: -122.6587};
  // The map, centered at var portland
  var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 9,
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
    const getObservations = {
      "async": true,
      "crossDomain": true,
      "url": "https://ebird.org/ws2.0/data/obs/US-OR/recent",
      "method": "GET",
      "headers": {
        "X-eBirdApiToken": "ojikre4deq6u"
      }
    }
    $.ajax(getObservations).done(function (response) {
      console.log(response);
      response.forEach( bird => {
        let location = {lat: bird.lat, lng: bird.lng};
        let marker = new google.maps.Marker({position: location, map: map});
        let contentString = `<h1>${bird.comName}</h1><strong>Location: </strong>${bird.locName}<br><strong>Date: </strong>${bird.obsDt}<br><strong>Count: </strong>${bird.howMany}`;
        let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    });
}

var GMAPS_KEY = config.GMAPS_KEY
const scriptMaker = () => {
  let gmapScript = "<script async defer src='https://maps.googleapis.com/maps/api/js?key=";
  gmapScript += GMAPS_KEY;
  gmapScript += "&callback=initMap'></script>"
  $("#scripts").append(gmapScript);
}
scriptMaker();
