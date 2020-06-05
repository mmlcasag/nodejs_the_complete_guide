const express = require('express');

const path = require('path');

const root = require('../utils/root');

// importing our admin file
const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // so we can gain access to our products array defined in the admin.js file
    console.log(admin.products);
    // it works!
    // so this is one way to share data
    // but doing this way means the data is shared across requests and users
    
    // so now let's install all three template engines to see how we can work with it
    // and display our view dinamically with our products
    // npm install pug --save
    // npm install ejs --save
    // npm install express-handlebars --save

    // after installed let's go our app.js and register our template engine

    // after creating our dynamic templates, we need to render it
    // so this:
    // const dirfile = path.join(root, 'views', 'shop.html');
    // res.sendFile(dirfile);
    // becomes this:
    res.render('shop');
    // we have already told express that our dynamics templates are in th views folder
    // we have already told express that our dynamics templates should be interpreted with pug
    // so by passing just 'shop' it already know that we mean to access our views/shop.pug file
});

module.exports = router;