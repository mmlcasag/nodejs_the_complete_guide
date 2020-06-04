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

// and now you can use it! \o/

// and how do I use it?
// well, good question!
// express.js is all about middleware
// request --> middleware1(req, res, next) --> next() --> middleware2(req, res, next) --> next() ... res.send() --> response
// and that's it in a nutshell!

// how to create a middleware?
app.use((req, res, next) => {
    console.log('In the middleware');
    next(); // allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In another middleware');
    next(); // allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In yet another middleware');
    res.send('<h1>Okay, you got it, right?</h1>'); // res.send finishes the request and sends the response
});

// the app also happens to be a request handler
// so you can pass it as an argument to the createServer
const server = http.createServer(app);

server.listen(3000);