const adminRoutes = require('../routes/admin');

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product Page',
        path: '/admin/add-product'
    });
};

module.exports.postAddProduct = (req, res, next) => {
    adminRoutes.products.push({ title: req.body.title });
    res.redirect('/'); 
}