const path = require('path');
const fs = require('fs');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const root = require('../utils/root');

const ITEMS_PER_PAGE = 1;

module.exports.getHome = (req, res, next) => {
    // PAGINATION
    // fetching for our query parameter "page"
    // for example: http://localhost:3000/?page=2
    // our local variable must hold the value "2"
    const page = +req.query.page || 1; // the "+" sign means toNumber() and the "||" means default 1
    let totalProducts = 0;

    // we also need to know the total count of products
    // to build our pagination correctly
    Product.find()
        .countDocuments()
        .then(countProducts => {
            totalProducts = countProducts;
            // here we can chain the rest of our query
            return Product.find()
                // Product.find() returns all the products but now 
                // if we are on page 1 we want to retrieve the products 1 and 2
                // if we are on page 2 we want to retrieve the products 3 and 4 and so on...
                // so how do we do that?
                // turns out mongodb has this skip() function
                // this will skip the first x products
                // with x being the previous page we are on times the items per page
                .skip((page - 1) * ITEMS_PER_PAGE)
                // i don't want just to skip, i also want to limit the amout of results
                // and we do that by using the limit() method
                .limit(ITEMS_PER_PAGE);
        })
        .then(products => {
            res.render('shop/home', {
                pageTitle: 'Home',
                path: '/',
                products: products,
                // passing all the parameters needed to work on our pagination
                totalProducts: totalProducts,
                hasNextPage: page * ITEMS_PER_PAGE < totalProducts,
                hasPrevPage: page > 1,
                nextPage: page + 1,
                currPage: page,
                prevPage: page - 1,
                lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE),
                firstPage: 1
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

module.exports.generateOrderInvoice = (req, res, next) => {
    const id = req.params.id;
    const file = 'invoice_' + id + '.pdf';
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
            
            const pdfDoc = new PDFDocument();
            
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="' + file + '"');
            
            pdfDoc.pipe(fs.createWriteStream(filePath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(26).text('Invoice', { underline: true });
            pdfDoc.fontSize(26).text('--------------------------');
            let totalPrice = 0;
            order.products.forEach(prod => {
                totalPrice = totalPrice + (prod.product.price * prod.quantity);
                pdfDoc.fontSize(14).text(prod.product.title + ' - ' + prod.quantity + ' UN x $ ' + prod.product.price);
            });
            pdfDoc.fontSize(26).text('--------------------------');
            pdfDoc.fontSize(26).text('Total Price: $ ' + totalPrice);
            
            pdfDoc.end();
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });   
}