# Cars Renting Service

> *This document briefly describes sample project business rules to analyze and design correct solution architecture.*

There are *vehicles* (cars) which can be rented by *persons* (application users). Cars are separated by:

  - Model (can be only Economy, Comfort or Business model)
  - Price (150-300 Currency Units for Economy, 300-1000 CUs for Comfort and 1000-3000 for Business)
  - Rating (from 0.0 to 5.0 stars)

*Person* can request available *vehicles* and system will generate some random list of them. List should be sorted by *vehicle* models: first comes Comfort models, then Economy and then Business.

When a *person* is ready to rent a *vehicle*, she creates an *order* which contains a selected car, *person* full name and other contact information in any form.

*Order* can be sent to the service. When it formed correctly (i.e. have all required fields) then system accepts it, otherwise not. User should know if order is incorrectly formed before it sent to system, and after it.
