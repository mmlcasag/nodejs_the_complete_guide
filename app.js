const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// how to place all those routes into different files?
// i'll create a new folder called "routes"
// this two new files: admin.js e shop.js
// '/add-product' and '/product' will go to admin.js
// '/' will go to shop.js

// now i have to import the newly created pages here
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);