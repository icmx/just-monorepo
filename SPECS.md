# Cars Renting Service

> *This document briefly describes sample project business area along with its processes to analyze and design correct solution architecture.*

There are *vehicles* (cars) which can be rented by *persons* (application users). Cars are separated by:

  - Model (it can be only Economy, Confort or Business model)
  - Price (150-300 Currency Units for Economy, 300-1000 CUs for Comfort and 1000-3000 for Business)
  - Rating (from 0.0 to 5.0 stars)

*Person* can request available *vehicles* and system will generate some random list of them. List should be sorted by *vehicle* models: first comes Comfort models, then Economy and then Business.

When a *person* is ready to rent a *vehicle*, he (or she) creates an *order* which contains selected car, *person* full name and other contact information in a free form.

*Order* can be sent to the service. If it formed correctly (i.e. have all required fields) then system accepts it, otherwise not. User should know if order is incorrectly formed before it sent to system, and after it.
