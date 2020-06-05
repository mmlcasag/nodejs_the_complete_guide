const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(shopRoutes);

// notice that when using app.get or app.post
// now the handler only triggers when there's an exact corresponce
// between the url name and the filter name
// but what if i want back that functionality for every request where url is like '%...%'?
// switch back to app.use()

// what if i want to create a 404 page to answer for all other requests?
app.use((req, res, next) => {
    // it would be nice to also return an http status of 404
    res.status(404);
    // and print something as a response
    res.send('<h1>Page not found</h1>');
    // you can also concatenate the functions like that:
    // res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);