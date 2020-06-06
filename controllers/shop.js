const Product = require('../models/product');

module.exports.getShopPage = (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop Page',
        path: '/',
        products: Product.fetchAll()
    });
}