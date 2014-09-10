var userPosition;
var map;
var userKeyword;
var distanceText;
var distanceMiles;
var distanceCost;





function doTask(item, done) {
  setTimeout(function() {
    //console.log(item);
    item();
    done(); // call this when you're done with whatever you're doing
  }, 50);
}

function call(keyword,callbackname) {
    userKeyword = keyword;
	var arr = [
    	getLocation,
    	getHotPoints
	];
	async.forEach(arr, doTask, function(err) {
    	callbackname();
	});
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
    var test = position;
    userPosition = retpos;
    
}

function showPositionError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
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
      }
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
      },
      error: function(xhr) {
        //alert("Error");
      }
    });
}

function getHotPoints() {
	$.ajax({
	  url: "http://morning-waters-6201.herokuapp.com/api/map",
	  type:"get", //send it through get method
	  data:{"keyword":userKeyword}, 
	  success: function(response) {
	    map = response;
	  },
	  error: function(xhr) {
	    //alert("Error");
	  }
	});
}

function getVacancies(postcode, keyword) {
    $.ajax({
      url: "http://api.lmiforall.org.uk/api/v1/vacancies/search",
      type:"get", //send it through get method
      data:{"postcode":postcode,"kewords":keyword}, 
      success: function(response) {
        map = response;
      },
      error: function(xhr) {
        //alert("Error");
      }
    });
}
