const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const database = require('./utils/database');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.fetchOne('5ee05e3fcf560b7e128b79df')
        .then(user => {
            req.user = user;
            console.log(user);
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

database.connect(() => {
    app.listen(3000);
});