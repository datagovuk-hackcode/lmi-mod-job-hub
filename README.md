## LMI for All Mod
# Jobhub

---

### Contributors
* [Kaelan Fouwels]
* [Shad Jahangir]
* [Giuseppe Sollazzo]

---

###Data used
* Current Location (via browser geolocation)
* Desired Occupation (via keyword in text field)
* Desired Location (via drop-down menu)

---

###Widgets
* Hot Jobs
* On Demand [http://lmi-ondemand.herokuapp.com/] - Broken?
* DropOut Or Not? [https://github.com/46bit/dropoutornot] - Working?
* lmi/wf - Graph of future predictions
* lmi/lfs - Unemployment Stats
* lmi/vacancies - BASIC stats? number of vacancies, number of employed

---

###External dependencies
* The data comes from api.lmiforall.gov.uk and from the HotPoints project, which is currently live at http://morning-waters-6201.herokuapp.com/api/

---

###How to run
* Standard html/javascript website, it can run on any server without particular configuration
* The user enters a keyword in the search field and press enter; this triggers a call to call() that passes the keyword and the browser location; this is an async call that, when finished, will trigger the callback function returnFunction(retval). The array retval[] will contain all the replies from the API calls

---

###API calls documentation
* call(keyword,destinationname,callbackname): initiates the API calls
* getLocation(): initialises the browser location sharing, asking the user for permission 
* placeToLatLon(place): converts a place name to its latitute and longitude (currently hard-coded)
* showPosition(position): it sets the position in the global variables and, when ready, initialises the calls to the remaining API calls
* showPositionError(error): if location is not available, it manages the error
* getDistanceByName(from, to): calculates distance and price for a couple of place names, and sets the values in the global variables
* getDistanceByLatLon(from_lat, from_lon, to_lat, to_lon): calculates distance and price for a couple of place by longitude and latitude, and sets the values in the global variables
* getHotPoints(): gets the vacancy density map for the given keyword
* getCrime(lat, lon): gets the 50 most recent crimes for the given latitude and longitude 
* getVacancies(): gets a list of job vacancies for the postcode linked to the place name sought for, filtering by keyword

---

###Improvements
There are three main pieces missing:
* there is an iframe with a map, in order to allow this to load properly it needs a way to workaround the cross-domain limitation
* there is a function in ajaxcalls.js to get crime and vacancies data according to the zone; these are not displayed in any tiles, but could be handy
* the call() function will need to direct the LF and ONET endpoints, rather than have them as independent pieces, so that all data is refreshed at the same time

