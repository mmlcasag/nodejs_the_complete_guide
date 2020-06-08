const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: rows
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.getAddProduct = (req, res, next) => {
    const editing = req.query.editing;
    
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/products',
        editing: (editing === 'true')
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(null, title, author, image, price, description);
    
    product.save();

    res.redirect('/admin/products'); 
};

module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    const editing = req.query.editing;
    Product.loadById(id, product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/products',
            product: product,
            editing: (editing === 'true')
        });
    });
};

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(id, title, author, image, price, description);
    
    product.save();

    res.redirect('/admin/products');
};

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.loadById(id, product => {
        Product.remove(product);
        res.redirect('/admin/products');
    });  
};