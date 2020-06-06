const Product = require('../models/product');

module.exports.getShopPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            pageTitle: 'Shop Page',
            path: '/',
            products: products
        });
    });
}