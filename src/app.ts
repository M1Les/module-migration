/// <reference path="data-services/users-data-service.ts" />
/// <reference path="data-services/departments-data-service.ts" />

var AQ;

let svcUsers = new AQ.DataServices.UsersDataService();

console.log(svcUsers.getUsers());