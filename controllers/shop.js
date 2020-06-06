const Product = require('../models/product');

module.exports.getShopPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Product List Page',
            path: '/',
            products: products
        });
    });
}