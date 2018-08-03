import UsersDataService from './users-data-service';

declare global {
  interface Window {
    AQ: {
        DataServices: {
            UsersDataService: typeof UsersDataService;
        }
    };
  }
}
console.log('running code inside of shim module');
window.AQ = {
    ...window.AQ,
    DataServices: {
        UsersDataService: UsersDataService
    }
};