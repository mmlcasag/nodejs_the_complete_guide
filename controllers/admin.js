const Product = require('../models/product');
const User = require('../models/user');

module.exports.getProducts = (req, res, next) => {
    Product.find()
        .select('_id title author image price') 
        .populate('userId', '-cart -__v')
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
    // let's say we want to protect our methods to make sure
    // no user enters here unless he/she is logged

    // one way to accomplish this is by doing this:
    if (!req.session.isLoggedIn) {
        // we already know that we set a isLoggedIn attribute to the session when the user logs in
        // so, if this value is undefined, it means the user is not logged in
        // so, in this case, let's redirect to the login page
        return res.redirect('/auth/login');
        // but doing so would require to copy and paste this code inside every method we want to protect
        // in the next lesson we are going to see a better way to do this
    }
    
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
    
    const product = new Product({
        title: title,
        author: author,
        image: image,
        price: price,
        description: description,
        userId: req.user._id
    });
    
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
    
    Product.findById(id)
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
    
    Product.findById(id)
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

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};