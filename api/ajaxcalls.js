var userPosition;
var map;
var userKeyword;
var distanceText;
var distanceMiles;
var distanceCost;

var postcode;

var myLat;
var myLon;

var destLat;
var destLon;

var retvals = new Array();
var usercallbackfunction;


function call(keyword,destinationname,callbackname) {
    usercallbackfunction = callbackname;
    userKeyword = keyword;
    placeToLatLon(destinationname);
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


function placeToLatLon(place) {

    var coords = new Array();

    if (place == "London") {
        coords['lat'] = "51.518571";
        coords['lon'] = "-0.12085";
        postcode = "WC1E6BT";
    } else if (place == "Birmingham") {
        coords['lat'] = "52.494278";
        coords['lon'] = "-1.895142";
        postcode = "B33DQ";
    } else if (place == "Reading") {
        coords['lat'] = "51.46235";
        coords['lon'] = "-0.977783";
        postcode = "RG11QH";
    } else if (place == "Oxford") {
        coords['lat'] = "51.752327";
        coords['lon'] = "-1.252441";
        postcode = "OX11BX";
    } else if (place == "Cambridge") {
        coords['lat'] = "52.210552";
        coords['lon'] = "0.12085";
        postcode = "CB10JH";
    } 
    destLat = coords['lat'];
    destLon = coords['lon'];
}

function showPosition(position) {
    var retpos = new Array();
    retpos['latitude'] = position.coords.latitude;
    retpos['longitude'] = position.coords.longitude; 
    
    myLat = position.coords.latitude;
    myLon = position.coords.longitude;

    userPosition = retpos;
    retvals['userPosition'] = userPosition;

    getCrime( position.coords.latitude, position.coords.longitude);
    getHotPoints();
    getDistanceByLatLon(myLat, myLon, destLat, destLon);
    getVacancies();
    usercallbackfunction(retvals);
    
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
      data:{"from_lat":from_lat, "from_lng":from_lon, "to_lat":to_lat, "to_lng": to_lon}, 
      success: function(response) {
        //var obj = jQuery.parseJSON( response );
        distanceMiles = response.distance;
        distanceCost = response.cost;
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
      data:{"lat":lat,"lng":0}, 
      success: function(response) {
        retvals['crime'] = response;
      },
      error: function(xhr) {
        //alert("Error");
      },
       async:   false
    });
}


function getVacancies() {
    $.ajax({
      url: "http://api.lmiforall.org.uk/api/v1/vacancies/search",
      type:"get", //send it through get method
      data:{"postcode":postcode,"kewords":userKeyword}, 
      success: function(response) {
        retvals['vacancies'] = response;
      },
      error: function(xhr) {
        //alert("Error");
      },
       async:   false
    });
}
