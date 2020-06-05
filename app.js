const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

// instead of using __dirname and then .. to go up one level
// there's ine better way to solve this
// and this is by using a helper
// so i'm creating a utils folder and a file named root.js
// and i'll import it on my routes and replace the path joins

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);