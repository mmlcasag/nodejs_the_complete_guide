const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports.getHome = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/home', {
                pageTitle: 'Home',
                path: '/',
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/products', {
                pageTitle: 'Products',
                path: '/products',
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getProductDetails = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                path: '/products',
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                cart: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postAddToCart = (req, res, next) => {
    const id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            Cart.add(product);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postDeleteFromCart = (req, res, next) => {
    const id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            Cart.remove(product);
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}