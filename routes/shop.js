const express = require('express');

const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const attributes = {
        pageTitle: 'Shop Page',
        path: '/',
        products: admin.products,
        hasProducts: admin.products.length > 0 // handlebars forbids logic inside the view
    };
    res.render('shop', attributes);
});

module.exports = router;