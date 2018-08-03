export default class UsersDataService {
    getUsers() {
        let auth = new AQ.Services.AuthenticationService({begin: ()=>{console.log('Calling from modularized code')}});
        console.log(auth);
        auth.login();
        return [{name: 'user'}];
    }
}