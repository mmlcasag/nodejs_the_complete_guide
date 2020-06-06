const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            products: products
        });
    });
};

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product();
    
    product.title = req.body.title;
    product.author = req.body.author;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;
    
    product.save();

    res.redirect('/'); 
}