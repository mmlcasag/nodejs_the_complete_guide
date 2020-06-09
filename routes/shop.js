const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getHome);
router.get('/products', shopController.getProducts);
/*
router.get('/product/:id', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.postAddToCart);
router.post('/delete-from-cart', shopController.postDeleteFromCart);
router.post('/create-order', shopController.postCreateOrder);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
*/

module.exports = router;