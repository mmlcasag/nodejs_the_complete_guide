const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
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
// here we specify the folder in which we want to store our files after uploading them
const MULTER_CONFIG = { dest: 'images' };
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
// remember that when we upload files we need to set a form property named enctype="multipart/form-data"?
// so, this package named multer parses this form of enctype
// just like what the bodyparser does for the default enctype x-www-form-urlencoded
// npm install --save multer
// after installing it, we have to import it here as a middleware
// this middleware will check for requests with enctype="multipart/form-data" and parse them correctly
// we have to specify if multer should look for a single file or multiple files, and the name of the attribute
app.use(multer(MULTER_CONFIG).single('image'));
app.use(session({...SESSION_CONFIG, store: store}));
app.use(csrfProtection);
app.use(flash());
app.use(userMiddleware);
app.use(localsMiddleware);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);
app.use((error, req, res, next) => {
    console.log(error.message);
    return res.redirect('/500');
});

mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });