const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// mongoose configuration is really simple...

// just import it...
const mongoose = require('mongoose');

// const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

/*
app.use((req, res, next) => {
    User.fetchOne('5ee05e3fcf560b7e128b79df')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        });
});
*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

// ...and connect with the database!
mongoose.connect('mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000); 
    })
    .catch(err => {
        console.log(err);
    });