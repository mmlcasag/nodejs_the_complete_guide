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

// we want to add a middleware before the default routes
// adding a User to the request
// later we will adjust this to have always the logged user
// but for now it's fine just with the admin user
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            // we want to store this user in the request
            // so we can add the user an attribute called user
            // we can create a new field to our request object
            // just make sure you don't override an existing one, like body
            req.user = user;
            // now, all we need to do is call next()
            // all the routes above will inherit the req.user
            // so they can use them
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

// from now on, all new products that are created should be
// associated to the currently logged in user
// for now, this will only be this dummy user we created manually
// so let's adjust our admin.js controller on the postAddProduct
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
sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        // just making sure that we have at least 1 user, creating a generic user in case we don't have any
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            // if sequelize didn't find any user, we will create one here
            // and since the create() function returns a Promise
            // we will return it to handle it below
            return User.create({ name: 'Admin', email: 'admin@shop.com' });
        } else {
            // if sequelize found an user, we will return a Promise
            // to match the same return type as above
            // so we can handle it below
            return Promise.resolve(user);
        }
    })
    .then(user => {
        // now everything must work just fine
        // and we can start our application
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });