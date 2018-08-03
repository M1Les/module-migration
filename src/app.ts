/// <reference path="data-services/users-data-service.ts" />
/// <reference path="data-services/departments-data-service.ts" />
/// <reference path="data-services/users-data-service.shim.ts" />
/// <reference path="services/authentication-service.ts" />

export function start() {
    let auth = new AQ.Services.AuthenticationService({});
    console.log('auth object from app', auth);

    let svcUsers = new window.AQ.DataServices.UsersDataService();

    console.log(svcUsers.getUsers());
}
