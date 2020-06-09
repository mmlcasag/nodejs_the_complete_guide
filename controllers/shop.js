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
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postAddToCart = (req, res, next) => {
    let userCart;
    let cartItemQty = 1;
    const id = req.body.id;
    
    // retrieves the cart for the currently logged in user
    req.user.getCart()
        .then(cart => {
            // save this reference for the cart to use it later
            userCart = cart;
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
                // we can do that to access the value of the in-between table
                // just like we did previously in the view
                cartItemQty = product.cartItem.qty + 1;
                // and we return the product to be handled later
                return product;
            // if the product is not already in the cart
            } else {
                // by default we always add 1 qty to the cart
                cartItemQty = 1;
                // retrieves the product from the database
                return Product.findByPk(id);
            }
        })
        .then(product => {
            // and now we add the product to the cart and the cartItemQty to the in-between table
            return userCart.addProduct(product, { through: { qty: cartItemQty } });
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
    // retrieves the cart for the currently logged in user
    req.user.getCart()
        .then(cart => {
            // retrieves the product by the id passed as an argument
            return cart.getProducts({ where: { id: id } });
        })
        .then(products => {
            // since we searched by the id
            // we can retrieve just the first element of the array
            const product = products[0];
            // we can do this to delete from the in-between table
            // remember: we don't want to delete the product
            // just remove it from the cartItem table!
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postCreateOrder = (req, res, next) => {
    let userCart;
    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { qty: product.cartItem.qty };
                        return product;
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .then(result => {
            return userCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
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

module.exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
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