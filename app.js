const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// CSRF
// so let's add another security functionality to our application
// let's install a package called csurf
// npm instal csurf --save
// this generates a token on our view
// and when our view submits the form to the server
// the server reads that token and checks if it is valid
// so, in order to do that, first thing we need to do
// after installing it, is importing it
const csrf = require('csurf');

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

const MONGODB_URI = 'mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose';

const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });

// then, you have to initialize the csrf function
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'BARIPOAUJFGVPSF', resave: false, saveUninitialized: false, store: store }));

// then, after initializing the session, you can create a middleware using csrf
app.use(csrfProtection);

// right now if we restart our application
// you will that no page with any form works anymore
// because the server is validating csrf tokens
// and our views aren't providing any
// so now we need to add it in our views too
// how do we do that?
// first we need to go to our controllers to send the token
// from the server to the view

app.use((req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        next();
    }
});

// there are some attributes that we need to pass to every view in the application
// for example, the isLoggedIn attribute and the csrfToken
// but this is a bit cumbersome
// what if there was a way to tell express that we want to add some variabled to every view?
// turns out there is, and this is how to do it
// we need to create a middleware
// and add the variables we want to pass on to the views in the locals field
app.use((req, res, next) => {
    // locals is a special field designed the store variables that are passed to the views
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    // so now we can adjust our controllers removing this attributes to the object we send to the views
    next();
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });