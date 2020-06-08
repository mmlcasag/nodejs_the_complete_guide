const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

// adding a one-to-many relationship
const sequelize = require('./utils/database');
// we will import our modules
const Product = require('./models/product');
const User = require('./models/user');

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

// now we are going to relate our models
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// this second argument is optional
// this defines how our relationship should be managed
// onDelete: if a user is deleted, what should happen to his products?
// CASCADE means the products will also be deleted

// you can also specify the other way around
User.hasMany(Product);
// with all these relationships specified

// sequelize.sync will not just create our tables
// it will manage the relationship between our tables
// the problem is that we have already created one of our tables
// so how can we force the recreation of the structure?
// turns out we can pass an argument called {force: true} inside the sync() function
// never use force: true in production!
sequelize.sync({force: true})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });