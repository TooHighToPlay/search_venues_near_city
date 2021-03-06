var map = null;
var amsterdam = new google.maps.LatLng(52.37022, 4.89517);
var popup = Handlebars.compile($("#popup-template").html());
var markersArray = [];

$( document ).ready(function() {
  	var bootstrapCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">');
	var bootstrapThemeCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">');
	var bootstrapJavaScriptLink = $('<script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>');

	$('body').append(bootstrapCSSLink);
	$('body').append(bootstrapThemeCSSLink);
	$('body').append(bootstrapJavaScriptLink);
});

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

$('#submit').click( function() {

    $('#map-canvas').hide();
    clearOverlays();
    $('#loading').append('<img src="http://i.imgur.com/KUJoe.gif">');

    var venue = $('#venue').val();
    var location = $('#location').val();

    var data = {
        query: venue,
        near: location
    };

    $.getJSON('/search_venues', data).done(function(data) {

        $('#warning').hide();

        var venuesJSON = data.data;
        var latSum = 0;
        var lngSum = 0;

        venuesJSON.forEach (function (venue) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
                title: venue.name,
                map: map
                //icon: 'smile.png'
            });

            markersArray.push(marker);

            latSum += venue.location.lat;
            lngSum += venue.location.lng;

            // and an infowindow
            var popupWindow = new google.maps.InfoWindow({
                content: popup(venue)
            });

            google.maps.event.addListener(marker, 'click', function() {
                popupWindow.open(map, marker);
            });
        });

        if (!venuesJSON || venuesJSON.length === 0) {
            $('#warning').show();
            $('#warning').text("No data found. Please try a different query.");
        } else {
            // center the map
            var lat = latSum / venuesJSON.length;
            var lng = lngSum / venuesJSON.length;
            var latlng = new google.maps.LatLng(lat, lng);
            map.setCenter(latlng);
        }

        $('#loading').empty();
        $('#map-canvas').show();
    });

});

function initialize() {
    var mapOptions = {
        center: amsterdam,
        zoom: 12
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);