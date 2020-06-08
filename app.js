// first thing to do is to npm install sequelize --save
// you have to have run the npm install mysql2 --save prior to installing sequelize
// then lets delete the products table we created on the previous lesson
// we do that because we want sequelize to manage our tables
// ok, now lets go to our configuration file, de utils/database.js
// ok, now lets edit our product model!

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);