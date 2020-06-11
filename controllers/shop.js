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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
        });
}

module.exports.getCart = (req, res, next) => {
    // get the current user
    req.user
        // populate de productId with the Product object
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                // pass the user.cart.items array as an argument to the view
                products: user.cart.items
            });
        })
        .catch(err => {
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                    // if i do just that
                    // mongoose will save only the reference, only the id for the product
                    // product: item.productId
                    // if i want to save the entire object
                    // i must do this:
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
            console.log(err);
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
            console.log(err);
        });
}