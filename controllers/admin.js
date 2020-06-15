const { validationResult } = require('express-validator');

const Product = require('../models/product');
const User = require('../models/user');

module.exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.session.user._id })
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
            res.redirect('/500');
        });
};

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/products',
        editing: false,
        hasErrors: false,
        validationErrors: []
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/products',
            editing: false,
            hasErrors: true,
            validationErrors: validationErrors,
            product: {
                title: title,
                author: author,
                image: image,
                price: price,
                description: description
            }
        });
    }

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
            // the problem of doing that is that there's going to be a lot
            // of duplications in our code
            // so maybe it is better to comment this
            // res.redirect('/500');
            // and do this instead:
            const error = new Error(err);
            error.httpStatusCode = 500;
            // when we call next() with an error passed as an argument
            // then we let express.js know that an error occurred
            // and it will skip all other middlewares and move right away
            // to our special error handling middleware in the app.js
            return next(error);
        });
};

module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    
    Product.findById(id)
        .then(product => {
            throw new Error('Dummy Error');
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/products',
                editing: true,
                hasErrors: false,
                validationErrors: [],
                product: product
            });
        })
        .catch((err) => {
            // or you can simply do this
            return next(err);
        });
};

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/products',
            editing: true,
            hasErrors: true,
            validationErrors: validationErrors,
            product: {
                _id: id,
                title: title,
                author: author,
                image: image,
                price: price,
                description: description
            }
        });
    }

    Product.findById(id)
        .then(product => {
            if (product.userId.toString() !== req.session.user._id.toString()) {
                req.flash('error', 'You do not have permission to edit this product');
                return res.redirect('/admin/products');
            }
            product.title = title;
            product.author = author;
            product.image = image;
            product.price = price;
            product.description = description;

            return product.save()
                .then(result => {
                    res.redirect('/admin/products');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    
    Product.findById(id)
        .then(product => {
            if (product.userId.toString() !== req.session.user._id.toString()) {
                req.flash('error', 'You do not have permission to delete this product');
                return res.redirect('/admin/products');
            }
            
            return Product.deleteOne({ _id: id, userId: req.session.user._id })
                .then(result => {
                    res.redirect('/admin/products');
                });
        })
        .catch(err => {
            console.log(err);
        });
};