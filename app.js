const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const userMiddleware = require('./middlewares/user');
const localsMiddleware = require('./middlewares/locals');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

const PUBLIC_FOLDER = path.join(root, 'public');
const BODYPARSER_CONFIG = { extended: false };
const MONGODB_URI = 'mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/mongoose';
const MONGOOSE_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGOGBSTORE_CONFIG = { uri: MONGODB_URI, collection: 'sessions' };
const SESSION_CONFIG = { secret: 'BARIPOAUJFGVPSF', resave: false, saveUninitialized: false };

const store = new MongoDBStore(MONGOGBSTORE_CONFIG);
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(PUBLIC_FOLDER));
app.use(bodyParser.urlencoded(BODYPARSER_CONFIG));
app.use(session({...SESSION_CONFIG, store: store}));
app.use(csrfProtection);
app.use(flash());
app.use(userMiddleware);
app.use(localsMiddleware);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

// special error handling middleware
// notice there are 4 arguments in the controller
// when you call next() with an error as the argument
// express skips all other middlewares and executes this one
app.use((error, req, res, next) => {
    return res.redirect('/500');
});

mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });