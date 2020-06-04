const http = require('http');

// how to install express.js?
// npm install express --save

// how to use express?
// 1) Import express.js
const express = require('express');

// 2) create an express application
const app = express();
// this will initialize a new object 
// where express.js the framework
// will store and manage a lot of
// things for us behind the scenes

// the app also happens to be a request handler
// so you can pass it as an argument to the createServer
const server = http.createServer(app);

server.listen(3000);

// and now you can use it! \o/