const express = require('express');

const shopController = require('../controllers/shop');

// then we import the recently created middleware
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// and now we can specify which routes will trigger the middleware before the actual controller

router.get('/', shopController.getHome);
router.get('/products', shopController.getProducts);
router.get('/product/:id', shopController.getProductDetails);
router.get('/cart', authMiddleware, shopController.getCart);
router.post('/add-to-cart', authMiddleware, shopController.postAddToCart);
router.post('/delete-from-cart', authMiddleware, shopController.postDeleteFromCart);
router.get('/checkout', authMiddleware, shopController.getCheckout);
router.post('/create-order', authMiddleware, shopController.postCreateOrder);
router.get('/orders', authMiddleware, shopController.getOrders);

module.exports = router;