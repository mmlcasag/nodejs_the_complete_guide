const Product = require('../models/product');

module.exports.getHome = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/home', {
            pageTitle: 'Home',
            path: '/',
            products: products
        });
    });
}

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products', {
            pageTitle: 'Products',
            path: '/products',
            products: products
        });
    });
}

module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}