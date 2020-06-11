// MANAGING SESSIONS
// to start managing sessions we will install another package
// npm install express-session --save
// now we need to initialize the session as soon as possible
// so the app.js is probably the best place to place your code

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// so let's import it
const session = require('express-session');

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// so now we need to configure our session and register it in a middleware
app.use(session({ secret: 'BARIPOAUJFGVPSF', resave: false, saveUninitialized: false }));

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

mongoose.connect('mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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