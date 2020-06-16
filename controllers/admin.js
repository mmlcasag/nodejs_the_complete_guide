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
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
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
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    
    const validationErrors = validationResult(req).array();
    
    // if image is undefined it means that whether there was a problem with the upload
    // or multer filtered the request maybe because the file had a wrong extension...
    if (!image) {
        validationErrors.push({
            value: '',
            msg: 'The file you tried to upload is not an image',
            param: 'image',
            location: 'body'
        });
    }

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
                // image: image, we don't neded to pass the file back
                price: price,
                description: description
            }
        });
    }

    const product = new Product({
        title: title,
        author: author,
        image: image.path, // remember? image is an object. we want to store just the path to the file
        price: price,
        description: description,
        userId: req.user._id
    });
    
    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    
    Product.findById(id)
        .then(product => {
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
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    // we also need to adjust the edit product
    const image = req.file;
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
                // image: image, we don't neded to pass the file back
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
            // here in the edit form we expect a different behaviour
            // we only want to update the image if the user provides the form with a different file
            // and only if the file is the correct format
            // so instead of doing the same validations we did in the add product page
            // we only want to set image if this is correct
            // if i don't set a new image i just don't want to update it
            if (image) {
                product.image = image.path;
            }
            product.price = price;
            product.description = description;

            return product.save()
                .then(result => {
                    res.redirect('/admin/products');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
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
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};