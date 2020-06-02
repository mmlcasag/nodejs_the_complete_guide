// node.js core modules:

// http  --> launch a server, send requests
// https --> launch a ssl
// fs    --> working with text files: reading and writing
// path  --> a helper to work with url between different operating systems
// os    --> 

/*
// imports the http module
const http = require('http');

// this function will respond to whatever requests reach our server

function requestListener(req, res) {
    console.log(req);
}

// this is our server
const server = http.createServer(requestListener);

server.listen(3000);
*/

/////////////////////////////////////////////

// or you can create an anonymous function
// this means the same
/*
// imports the http module
const http = require('http');

const server = http.createServer(function(req, res) {
    console.log(req);
});

server.listen(3000);
*/

/////////////////////////////////////////////

// or you can even do that:

// imports the http module
const http = require('http');

const server = http.createServer((req, res) => {
    // logs the whole request
    // with all its irrelevant attributes
    // console.log(req);
    // what really matters is this:
    console.log('URL: ' + req.url);
    console.log('Method: ' + req.method);
    console.log('Headers: ' + req.headers);
    
    // if you see object Object it is because it's concatenated with other stuff
    // log it separately to see its contents
    console.log(req.headers);

    // this breaks the event loop
    // process.exit();

    // Want to quit your running Node.js server?
    // You can always do that by pressing CTRL + C in the terminal/ command prompt window 
    // where you started your server (i.e. where you ran node app.js).
});

server.listen(3000);

// we will use this third approach during this course