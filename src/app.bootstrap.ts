interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

// require the shim file to set up globals for modularized code
let shim = require('./data-services/users-data-service.shim');

let app = require('app');
app.start();