const express = require('express');

const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/auth');
const adminValidators = require('../validators/admin');

const router = express.Router();

router.get('/products', authMiddleware, adminController.getProducts);
router.get('/add-product', authMiddleware, adminController.getAddProduct);
router.post('/add-product', adminValidators.postAddProductValidator, authMiddleware, adminController.postAddProduct);
router.get('/edit-product/:id', authMiddleware, adminController.getEditProduct);
router.post('/edit-product', adminValidators.postEditProductValidator, authMiddleware, adminController.postEditProduct);
router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);

module.exports = router;