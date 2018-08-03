module AQ.Services {
    "use strict";

    export class AuthenticationService {
        constructor(private authenticator) {}

        login() {
            console.log('starting authentication');
            this.authenticator.begin();
        }
    }
}