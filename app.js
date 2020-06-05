const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// so what if i want to add a html file for our 404 page?
// first lets create a file named 404.html
// then create a route named error.js
// then import it here
const errorRoutes = require('./routes/error');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// then register it here 
// here it has to be placed in the last position
app.use(errorRoutes);

app.listen(3000);