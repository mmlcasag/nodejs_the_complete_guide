const http = require('http');

// import the file we just created
const routes = require('./routes');

console.log(routes.version);

// and I pass the reference to the function
// in the place of the previous array function
// this should work exactly the same as before
const server = http.createServer(routes.handler);

server.listen(3000);