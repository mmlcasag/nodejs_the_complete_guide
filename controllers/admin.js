const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product Page',
        path: '/admin/add-product'
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product();
    product.title = req.body.title;
    product.save();
    res.redirect('/'); 
}