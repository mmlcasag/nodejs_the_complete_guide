const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports.getHome = (req, res, next) => {
    // in sequelize we use findAll instead of fetchAll
    // we can pass as argument a where clause: Product.findAll({ where: id === 1 })
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
    // so let's see how it shows if the run the application!
    // it worked!
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
    // we can use the obvious version:
    // Product.findByPk(id)
    // or we can also use it specifying the where clause
    Product.findAll({ where: { id: id } })
        // since it's findAll it returns an array of elements
        // so we have to force to show just the first element
        // of the products array
        // we know that we are querying by the id
        // but sequelize doesn't know this
        .then(products => {
            res.render('shop/product-detail', {
                pageTitle: products[0].title,
                path: '/products',
                product: products[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
    // of course, if we used the findByPk version
    // we wouldn't need to do all these changes
    // check out the postAddToCart where I provided
    // an example using findByPk
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
    Product.loadById(id)
        .then(([product]) => {
            Cart.remove(product[0]);
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