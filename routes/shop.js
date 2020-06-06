const express = require('express');

const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // handlebars forbids logic inside the view
    const attributes = {
        pageTitle: 'Shop Page',
        formsCss: false,
        productCss: true,
        activeMenuShop: true,
        activeMenuProd: false,
        path: '/',
        products: admin.products,
        hasProducts: admin.products.length > 0
    };
    res.render('shop', attributes);
});

module.exports = router;