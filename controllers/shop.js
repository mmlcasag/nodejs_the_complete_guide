const path = require('path');
const fs = require('fs');
const root = require('../utils/root');

const Product = require('../models/product');
const Order = require('../models/order');

module.exports.getHome = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/home', {
                pageTitle: 'Home',
                path: '/',
                products: products
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/products', {
                pageTitle: 'Products',
                path: '/products',
                products: products
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getProductDetails = (req, res, next) => {
    const id = req.params.id;

    Product.findById(id)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                path: '/products',
                product: product
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: user.cart.items
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.postAddToCart = (req, res, next) => {
    const id = req.body.id;

    Product.findById(id)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.postDeleteFromCart = (req, res, next) => {
    const id = req.body.id;
    
    Product.findById(id)
        .then(product => {
            return req.user.removeFromCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

module.exports.postCreateOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(item => {
                return { 
                    product: { ...item.productId._doc },
                    quantity: item.quantity
                };
            });
            
            const order = new Order({
                user: {
                    _id: req.user._id,
                    name: req.user.name,
                    email: req.user.email
                },
                products: products
            });
            
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getOrders = (req, res, next) => {
    Order.find({ 'user._id': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getOrderInvoice = (req, res, next) => {
    const id = req.params.id;
    const file = 'invoice_' + id + '.pdf';
    // now we need to retrieve this file
    // and how do we do that?
    // with our path and fs package!
    const filePath = path.join(root, 'data', 'invoices', file);
    
    Order.findById(id)
        .then(order => {
            if (!order) {
                const error = new Error('Order not found');
                error.httpStatusCode = 422;
                return next(error);
            }
            if (order.user._id.toString() !== req.session.user._id.toString()) {
                const error = new Error('You do not have permission to access this order');
                error.httpStatusCode = 403;
                return next(error);
            }
            // otherwise...
            fs.readFile(filePath, (err, fileContent) => {
                if (err) {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                }
                // this just this works!
                // but generates a random file name without file extension
                // so, not the best user experience
                // now we can improve things a bit by providing further information
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="' + file + '"')
                return res.send(fileContent);
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}