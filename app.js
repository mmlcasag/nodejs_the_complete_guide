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

// it doesn't matter if you place this handler before or after /add-product because the names are different
app.use('/product', (req, res, next) => {
    // how to the get the request body with express.js?
    console.log(req.body);
    // now it's just req.body!
    // instead of having to register all those event listeners!
    // the only problem is that it logs as "undefined"
    // to deal with it, we need to install another third-party package: body-parser
    // so let's run npm install body-parser --save
    // then we have to import it (line 1)
    // and register via app.use() (line 7)
    // now you can try again to see how it logs req.body in the console
    res.redirect('/'); 
});

app.use('/', (req, res, next) => {
    res.send('<h1>This is our "Main" page</h1>');
});

app.listen(3000);