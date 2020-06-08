// first thing to do is to npm install sequelize --save
// you have to have run the npm install mysql2 --save prior to installing sequelize
// then lets delete the products table we created on the previous lesson
// we do that because we want sequelize to manage our tables
// ok, now lets go to our configuration file, de utils/database.js
// ok, now lets edit our product model!
// ok, now we have to tell sequelize that we want him to create the tables for us

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

// so let's import our file
const sequelize = require('./utils/database');
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

// this method searches for all the models we defined
// and it does that by searching for all the calls we make to sequelize.define()
// and then basically it creates the tables for us
sequelize.sync()
    .then(result => {
        // console.log(result);
        // and let's start our application only if we managed to create our structure successfully
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

// we can see that it generates on the log the create table for us
// and it only creates the table for us if it doesn't already exist
// Executing (default): CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255) NOT NULL, `image` VARCHAR(255) NOT NULL, `price` DOUBLE PRECISION NOT NULL DEFAULT 0, `description` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
// ok, everything seems fine, so we are going to comment our console.log()
// and by going into MySQL WorkBench we saw the table created there and also with 2 other columns: createdAt, updatedAt sequelize creates by default for us
// we could disable it, but its good practice to leave it as is