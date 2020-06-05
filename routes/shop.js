const express = require('express');

// importing our admin file
const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
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
    // res.render('shop');
    // we have already told express that our dynamics templates are in th views folder
    // we have already told express that our dynamics templates should be interpreted with pug
    // so by passing just 'shop' it already know that we mean to access our views/shop.pug file

    // now we want to pass our products to our shop pug page
    // so how do we do this?
    // it's really easy
    // instead of res.render('shop');
    // we do it like that:
    res.render('shop', { pageTitle: 'Shop Page', products: admin.products });
    // now we can refer to the admin.products array by the name products inside the pug file
});

module.exports = router;