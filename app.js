const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// what if i want to add a '/admin' before every route inside admin.js?
// instead of going one by one inside the file
// you can do it like that
app.use('/admin', adminRoutes);
// now you have to access /admin/add-product
// and submit to /admin/product
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);