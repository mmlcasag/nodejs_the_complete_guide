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
            /*
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                cart: products
            });
            */
           console.log(products);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postAddToCart = (req, res, next) => {
    let fetchedCart;
    const id = req.body.id;
    
    // retrieves the cart for the currently logged in user
    req.user.getCart()
        .then(cart => {
            // save this reference for the cart to use it later
            fetchedCart = cart;
            // checks if there is already a product with the same id as the one being added
            return cart.getProducts({ where: { id: id } });
        })
        .then(products => {
            let product;
            // if there is a product, then updates the reference here
            if (products.length > 0) {
                product = products[0];
            }
            // if the product is already in the cart
            if (product) {
                // ...
            // if the product is not already in the cart
            } else {
                // retrieves it from the database
                return Product.findByPk(id)
                    .then(product => {
                        // then inserts it in the cart
                        // also specifying the qty 1 on the through table (CartItems)
                        return fetchedCart.addProduct(product, { through: { qty: 1 } });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .then(cart => {
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