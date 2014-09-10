var userPosition;
var map;
var userKeyword;


$.getScript("async.js", function(){
});

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
