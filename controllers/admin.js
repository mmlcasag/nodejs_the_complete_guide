const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: products
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
    
    Product.create({
        title: title,
        author: author,
        image: image,
        price: price,
        description: description
    })
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
    Product.findByPk(id)
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
    
    Product.findByPk(id)
        .then(product => {
            // this won't automatically change the data in the database
            product.title = title;
            product.author = author;
            product.image = image;
            product.price = price;
            product.description = description;
            // in order to do that we must run
            // remember that save() also returns a .then() and a catch()
            // in order not to nest many .then() and catch()
            // i am going to return this so I can handle it beneath
            return product.save();
        })
        .then(result => {
            // this will handle successfull responses from the save() method
            res.redirect('/admin/products');
        })
        .catch(err => {
            // this catch() will handle eventual errors for both findByPk() and save() methods
            console.log(err);
        });
};

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            Product.delete(product);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};