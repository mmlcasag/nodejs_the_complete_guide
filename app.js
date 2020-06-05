const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('I am a middleware!');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send('<html><body><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form></body></html>');
});

// this middleware is executing for both get requests and posts requests
// it should execute only for posts requests
// what can we do regarding that?
// we can use app.get() to filter for get requests only
// we can use app.post() to filter for post requests only
// app.use() execute for both methods
// so all you have to do is change to app.post()
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

app.use('/', (req, res, next) => {
    res.send('<h1>This is our "Main" page</h1>');
});

app.listen(3000);