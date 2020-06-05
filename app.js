// create a npm project and install express.js with nodemon if you want

// create an express.js app which funnels the requests through 2
// middleware functions that log something to the console and return one response

// handle requests to '/' and '/users' such that each request only has one
// handler/middleware that does something with it (e.g. send dummy response )

const express = require('express');

const app = express();

/*
app.use((req, res, next) => {
    console.log('Middleware 1!');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2!');
    next();
});

app.use('/', (req, res, next) => {
    res.send('<h1>Response!</h1>');
});
*/

app.use('/user', (req, res, next) => {
    res.send('<h1>This is the "User" Page!</h1>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>This is the "Main" Page!</h1>');
});

app.listen(3000);