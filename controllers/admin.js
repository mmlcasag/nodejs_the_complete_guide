const Product = require('../models/product');
const User = require('../models/user');

module.exports.getProducts = (req, res, next) => {
    Product.find()
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
            // now you get from the return
            // not just a json like a product
            // but a full product class
            // with all its mongoose methods available!
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

module.exports.getScriptInvalidProducts = (req, res, next) => {
    // Objective
    
    // we need go loop through all the carts
    // then look into all the products inside each of the carts
    // and check if there is a document with the correspondent id in the products collection
    // if there is, then this means the product is valid
    // if there is not, then you have to remove this product from this cart
    
    // Fetch all the users
    User.fetchAll()
        .then(users => {
            // for each user
            users.forEach(user => {
                const currentUser = new User(user.username, user.email, user.cart, user._id);
                // for each item of each user
                user.cart.items.forEach(item => {
                    // check if you can fetch the product in the products collection
                    Product.fetchOne(item.productId)
                        .then(product => {
                            // if the product is valid, there is nothing you should do
                            console.log('Product._id ' + product._id + ' is valid');
                        })
                        .catch(err => {
                            // if the product is valid, you must remove it from the cart
                            console.log('Product._id ' + item.productId + ' is invalid');
                            // remove the product from the cart
                            currentUser.removeFromCart(item.productId)
                                .then(result => {
                                    console.log('Product._id ' + item.productId + ' removed from the cart._id ' + currentUser._id);
                                })
                                .catch(err => {
                                    console.log('Error trying to delete invalid product: ' + err)
                                });
                        })
                });
            });
        })
        .then(result => {
            res.send('OK');
        })
        .catch(err => {
            res.send(err);
        });
};