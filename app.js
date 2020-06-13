const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// SENDING EMAILS
// we will use sendgrid as our email service provider
// so, first thing we need to do is to sign up at www.sendgrid.com
// then we need to install nodemailer, a third-party package responsible for sending emails
// npm install nodemailer --save
// then we need to install a nodemailer package that integrates nodemailer to sendgrid
// npm install nodemailer-sendgrid-transport --save

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

mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });