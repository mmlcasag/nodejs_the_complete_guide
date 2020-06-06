const adminRoutes = require('../routes/admin');

module.exports.getShopPage = (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop Page',
        path: '/',
        products: adminRoutes.products
    });
}