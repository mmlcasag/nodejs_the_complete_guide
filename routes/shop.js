const express = require('express');

const shopController = require('../controllers/shop');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', shopController.getHome);
router.get('/products', shopController.getProducts);
router.get('/product/:id', shopController.getProductDetails);
router.get('/cart', authMiddleware, shopController.getCart);
router.post('/add-to-cart', authMiddleware, shopController.postAddToCart);
router.post('/delete-from-cart', authMiddleware, shopController.postDeleteFromCart);
router.get('/checkout', authMiddleware, shopController.getCheckout);
router.get('/checkout/cancel', authMiddleware, shopController.getCheckout);
router.get('/checkout/success', authMiddleware, shopController.getCheckoutSuccess);
router.get('/orders', authMiddleware, shopController.getOrders);
router.get('/order/:id', authMiddleware, shopController.generateOrderInvoice);

module.exports = router;