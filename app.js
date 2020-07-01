const path = require('path');

// environment variables
// npm install --save dotenv
// import it and call the config method as soon as possible
// passing the { path: path.join(__dirname, FILENAME) } config to specify the file name
// dotenv defaults to .env in case no further configuration is provided
/*
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw new Error('Error trying to load environment variables');
} else {
    console.log(result.parsed);
}
*/

// Preload
// in package.json, you can use the --require (-r) command line option to preload dotenv.
// By doing this, you do not need to require and load dotenv in your application code.
// This is the preferred approach when using import instead of require.
// node -r dotenv/config app.js
// check out package.json at
/*
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node -r dotenv/config app.js", <-- you can use this instead of loading dotenv in your application code.
    "start::prod": "node -r dotenv/config app.js",
    "start::dev": "nodemon app.js"
},
*/
// when using this approach you must use the .env file name approach and place it in the root folder of the application

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// setting secure response headers with HELMET
// adds security to our application
// basically it prevents some sorts of malicious attacks
// just by setting up some response headers
// go through the docs to learn more
// npm install --save helmet
// after installing it, you need to import it
const helmet = require('helmet');

// compressing assets
// this picks up any static data
// js files css files and send them compressed to the browser
// images are not compressed
// the browser, in turn, decompressed them before executing them
// with that less data is transferred via network
// therefore, it makes it faster
// npm install --save compression
// after installing it, you need to import it
// this is interesting if your app has many js and css files
const compression = require('compression');

const userMiddleware = require('./middlewares/user');
const localsMiddleware = require('./middlewares/locals');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const root = require('./utils/root');

const app = express();

const PUBLIC_FOLDER = path.join(root, 'public');
const IMAGES_FOLDER = path.join(root, 'images');
const BODYPARSER_CONFIG = { extended: false };
// setting environment variables
// 1) use backticks (`) instead of single quotes (')
// 2) use process.env and the name of our environment variables
// 3) in development environment, if using nodemon, you can create a nodemon.json and store your environment variables there
// 4) otherwise go to package.json and specify them there before calling node and the main application file
//    example: PORT=3000 DATABASE_USER=admin DATABASE_PASS=admin DATABASE_NAME=mongoose STRIPE_KEY=sk_test_51Gv6yJAOAAt4VS0TF1uYJdIkdHaHnuA95Z1TIqaUN5Fqw9jm6flmPXk2Z1KorCgRVcI9Cr9DZHHsAXtRx3uWmWu100cc0ZNSXc node app.js
const MONGODB_URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@mmlcasag-cvtew.mongodb.net/${process.env.DATABASE_NAME}`;
const MONGOOSE_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGOGBSTORE_CONFIG = { uri: MONGODB_URI, collection: 'sessions' };
const SESSION_CONFIG = { secret: 'BARIPOAUJFGVPSF', resave: false, saveUninitialized: false };

// this is a special environment variable
// all hosting providers set this environment variable to production
// node.js also detects the environment you are working
// and if it detected that you are in production mode
// it restricts the error messages, for example
// it is always a good practice to set this variable when running the app in production
console.log(process.env.NODE_ENV);

const MULTER_STORAGE = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const randomNumber = Math.floor(Math.random() * 100000000000) + 1;
        callback(null, randomNumber + '-' + file.originalname);
    }
});

const MULTER_FILTER = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const MULTER_CONFIG = { 
    storage: MULTER_STORAGE,
    fileFilter: MULTER_FILTER
};

const store = new MongoDBStore(MONGOGBSTORE_CONFIG);
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

// and you also need to add it as a middleware
app.use(helmet());
// and you also need to add it as a middleware
app.use(compression());
app.use(express.static(PUBLIC_FOLDER));
app.use('/images', express.static(IMAGES_FOLDER));
app.use(bodyParser.urlencoded(BODYPARSER_CONFIG));
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
        // environment variables
        // here we also dont want to hardcore our port number in our application
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    });