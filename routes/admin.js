const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const products = [];

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

module.exports.products = products;
module.exports.routes = router;