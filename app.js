// ok, managing sessions seems fine the way it is
// but now we are storing session data on the server memory
// if your application has many users logged in simultaneously
// this will become a problem
// the best place to store sessions is in the database
// we will store our sessions in mongodb
// for that we need to install another third-party package
// npm install --save connect-mongodb-session

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// after the session import, let's import the connect-mongodb-session
// you also have to pass your session as an argument of the returned function
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

const MONGODB_URI = 'mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose';

// after that, you can initialize your session store
// passing some configuration in the constructor
const store = new MongoDBStore({
    uri: MONGODB_URI, // what database should it store that information?
    collection: 'sessions' // in which collection should the information be stored?
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// and since we now have a place to store our sessions
// we need to pass this in the session configuration as a new argument
app.use(session({ secret: 'BARIPOAUJFGVPSF', resave: false, saveUninitialized: false, store: store }));
// and that's it!
// now all session information will be stored in the database!
// this is much more efficient and secure
// always do that in your future applications!

app.use((req, res, next) => {
    User.findById('5ee23237956ed626eca64fca')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Márcio Luís Casagrande',
                        email: 'mmlcasag@gmail.com',
                        cart: { items: [] }
                    });
                    user.save();
                }
            });        
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });