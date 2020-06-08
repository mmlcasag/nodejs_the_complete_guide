const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports.getHome = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, metadata]) => {
            res.render('shop/home', {
                pageTitle: 'Home',
                path: '/',
                products: rows
            });
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products', {
            pageTitle: 'Products',
            path: '/products',
            products: products
        });
    });
}

module.exports.getProductDetails = (req, res, next) => {
    Product.loadById(req.params.id, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    });
}

module.exports.getCart = (req, res, next) => {
    Cart.fetchAll(cart => {
        res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            cart: cart
        });
    });
}

module.exports.postAddToCart = (req, res, next) => {
    const id = req.body.id;
    Product.loadById(id, product => {
        Cart.add(product);
        res.redirect('/cart');
    });
}

module.exports.postDeleteFromCart = (req, res, next) => {
    const id = req.body.id;
    Product.loadById(id, product => {
        Cart.remove(product);
        res.redirect('/cart');
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