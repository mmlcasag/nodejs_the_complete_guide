const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: products
            });
        })
        .catch(err => {
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
    
    const product = new Product(title, author, image, price, description);
    
    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    const editing = req.query.editing;
    
    Product.fetchOne(id)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/products',
                product: product,
                editing: (editing === 'true')
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    
    Product.fetchOne(id)
        .then(product => {
            product.title = title;
            product.author = author;
            product.image = image;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

/*
module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};
*/