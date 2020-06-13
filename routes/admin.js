const express = require('express');

const adminController = require('../controllers/admin');

// then we import the recently created middleware
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// and now we can specify which routes will trigger the middleware before the actual controller

router.get('/products', authMiddleware, adminController.getProducts);
router.get('/add-product', authMiddleware, adminController.getAddProduct);
router.post('/add-product', authMiddleware, adminController.postAddProduct);
router.get('/edit-product/:id', authMiddleware, adminController.getEditProduct);
router.post('/edit-product', authMiddleware, adminController.postEditProduct);
router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);

module.exports = router;