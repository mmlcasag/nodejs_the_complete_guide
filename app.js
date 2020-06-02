// node.js core modules:

// http  --> launch a server, send requests
// https --> launch a ssl
// fs    --> working with text files: reading and writing
// path  --> a helper to work with url between different operating systems
// os    --> 

// imports the http module
const http = require('http');

// this function will respond to whatever requests reach our server
function requestListener(req, res) {
    console.log(req);
}

// this is our server
const server = http.createServer(requestListener);

server.listen(3000);

/////////////////////////////////////////////

// or you can create an anonymous function
// this means the same
const server = http.createServer(function(req, res) {
    console.log(req);
});

server.listen(3000);

/////////////////////////////////////////////

// or you can even do that:
const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(3000);

// we will use this third approach during this course