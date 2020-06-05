const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// How to create views for our project?
// Well, I have created the views folder
// and the shop.html and add-product.html files within it
// ok, so now the html pages have been created
// but how do we show them?
// well, go to shop.js file and look what i've done
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);