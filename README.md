RS-LmiModdingDay
================

###User Data
- Current Location
- Desired Occupation?
- Desired Location?

###Widgets
- Hot Jobs
- On Demand [http://lmi-ondemand.herokuapp.com/] - Broken?
- DropOut Or Not? [https://github.com/46bit/dropoutornot] - Working?
- lmi/wf - Graph of future predictions
- lmi/lfs - Unemployment Stats
- lmi/vacancies - BASIC stats? number of vacancies, number of employed

###External dependencies
- The data comes from api.lmiforall.gov.uk and from the HotPoints project, which is currently live at http://morning-waters-6201.herokuapp.com/api/

###To get the project working
There are three main pieces missing:
- there is an iframe with a map, in order to allow this to load properly it needs a way to workaround the cross-domain limitation
- there is a function in ajaxcalls.js to get crime and vacancies data according to the zone; these are not displayed in any tiles, but could be handy
- the call() function will need to direct the LF and ONET endpoints, rather than have them as independent pieces, so that all data is refreshed at the same time

