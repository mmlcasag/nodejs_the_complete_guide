const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.get('/add-product', adminController.getAddProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/save-product', adminController.postSaveProduct);

module.exports = router;