const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // handlebars forbids logic inside the view
    const attributes = {
        pageTitle: 'Add Product Page',
        formsCss: true,
        productCss: true,
        activeMenuShop: false,
        activeMenuProd: true,
        path: '/admin/add-product'
    };
    res.render('add-product', attributes);
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/'); 
});

module.exports.products = products;
module.exports.routes = router;