var userPosition;
var map;
var userKeyword;
var distanceText;
var distanceMiles;
var distanceCost;


var retvals = new Array();
var usercallbackfunction;


function call(keyword,destinationname,callbackname) {
    usercallbackfunction = callbackname;
    getLocation();
}


function refreshTiles() {
	// userPosition
	// map
	refreshTiles();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showPositionError);
    } else {
        var resp = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    var retpos = new Array();
    retpos['latitude'] = position.coords.latitude;
    retpos['longitude'] = position.coords.longitude; 
    
    userPosition = retpos;
    retvals['userPosition'] = userPosition;
    getCrime( position.coords.latitude, position.coords.longitude);
    getHotPoints();

    
}

function showPositionError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            return"Location information is unavailable."
            break;
        case error.TIMEOUT:
            return "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred."
            break;
    }
    retvals['userPosition'] = "ERROR";
}

function getDistanceByName(from, to) {
    // http://morning-waters-6201.herokuapp.com/api/distance?location_from=Reading&location_to=Ipswich
    $.ajax({
      url: "http://morning-waters-6201.herokuapp.com/api/distance",
      type:"get", //send it through get method
      data:{"location_from":from, "location_to":to}, 
      success: function(response) {
        distanceText = response;
      },
      error: function(xhr) {
        //alert("Error");
      },
        async:   false
    });
}

function getDistanceByLatLon(from_lat, from_lon, to_lat, to_lon) {
    // http://morning-waters-6201.herokuapp.com/api/distance_ll.json?from_lat=52&from_lng=1&to_lat=53&to_lng=17
    $.ajax({
      url: "http://morning-waters-6201.herokuapp.com/api/distance_ll.json",
      type:"get", //send it through get method
      data:{"from_lat":from_lat, "from_lon":from_lon, "to_lat":to_lat, "to_lon": to_lon}, 
      success: function(response) {
        var obj = jQuery.parseJSON( '{ "name": "John" }' );
        distanceMiles = obj.distance;
        distanceCost = obj.cost;
        retvals['distanceMiles'] = distanceMiles;
        retvals['distanceCost'] = distanceCost;
      },
      error: function(xhr) {
        //alert("Error");
      },
       async:   false
    });

}

function getHotPoints() {
	$.ajax({
	  url: "http://morning-waters-6201.herokuapp.com/api/map",
	  type:"get", //send it through get method
	  data:{"keyword":userKeyword}, 
	  success: function(response) {
	    map = response;
        retvals['map'] = map;
	  },
	  error: function(xhr) {
	    //alert("Error");
	  },
       async:   false
	});
}

function getCrime(lat, lon) {
    // http://morning-waters-6201.herokuapp.com/api/crime_ll.json?lat=52&lng=-1
    $.ajax({
      url: "http://morning-waters-6201.herokuapp.com/api/crime_ll.json",
      type:"get", //send it through get method
      data:{"lat":lat,"lon":lon}, 
      success: function(response) {
        retvals['crime'] = response;
        usercallbackfunction(retvals);
      },
      error: function(xhr) {
        //alert("Error");
      },
       async:   false
    });
}


function getVacancies(postcode, keyword) {
    $.ajax({
      url: "http://api.lmiforall.org.uk/api/v1/vacancies/search",
      type:"get", //send it through get method
      data:{"postcode":postcode,"kewords":keyword}, 
      success: function(response) {
        retvals['vacancies'] = response;
      },
      error: function(xhr) {
        //alert("Error");
      },
       async:   false
    });
}
