const express = require('express');

const adminController = require('../controllers/admin');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/products', authMiddleware, adminController.getProducts);
router.get('/add-product', authMiddleware, adminController.getAddProduct);
router.post('/add-product', authMiddleware, adminController.postAddProduct);
router.get('/edit-product/:id', authMiddleware, adminController.getEditProduct);
router.post('/edit-product', authMiddleware, adminController.postEditProduct);
router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);

module.exports = router;