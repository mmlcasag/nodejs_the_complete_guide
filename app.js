const express = require('express');

const app = express();

// how to handle different routes?

// this handles the '/' request
// but what if a request the '/help' page?
// this triggers too
// why?
// because this means that the request must start with '/'
// so, '/help' is also valid
// and what to do if you want to display a different page for '/help?'
// place the '/help' handler before the '/'
// and what if I want to use a middleware that runs before both handlers?
app.use('/', (req, res, next) => {
    console.log('I am a middleware!');
    next(); // don't forget the next() function!
});

app.use('/help', (req, res, next) => {
    res.send('<h1>Ja ja ja, Was ist los? Was ist das?</h1>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Eins Zwei Polizei!</h1>');
});

app.listen(3000);