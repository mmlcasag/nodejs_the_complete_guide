const express = require('express');

const path = require('path');

const root = require('../utils/root');

const router = express.Router();

// to store our added products
const products = [];

router.get('/add-product', (req, res, next) => {
    const dirfile = path.join(root, 'views', 'add-product.html');
    res.sendFile(dirfile);
});

router.post('/add-product', (req, res, next) => {
    // instead of console logging our added products
    // now it pushes into our new array
    // we want our products to be an array of objects
    // each object will have an attribute of name title
    products.push({ title: req.body.title });
    res.redirect('/'); 
});

// so now we will also export our array
// of course now we need to change our references to admin.js throghout the project
// because so far we were exporting only router, now it's an object with two attributes
module.exports.products = products;
module.exports.routes = router;