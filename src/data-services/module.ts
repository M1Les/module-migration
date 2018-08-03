/// <reference path="users-data-service.ts" />
/// <reference path="departments-data-service.ts" />

import UsersDataService from './users-data-service';


console.log('Calling from data-services module');
let svcUsers2 = new UsersDataService();