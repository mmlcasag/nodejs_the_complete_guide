const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// mongoose configuration is really simple...

// just import it...
const mongoose = require('mongoose');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findById('5ee23237956ed626eca64fca')
        .then(user => {
            // now with mongoose you don't need to do this anymore!
            // req.user = new User(user.username, user.email, user.cart, user._id);
            // now you can simply do that!
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

// ...and connect with the database!
mongoose.connect('mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose?retryWrites=true&w=majority')
    .then(result => {
        // this method findOne() like that, without passing any argument
        // will return one document from the user collection
        // if doesn't, then the user return variable will be undefined
        // that means we don't have any user in the database
        // in that case, we will create a default user
        User.findOne()
            .then(user => {
                if (!user) {
                    // create a default user
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