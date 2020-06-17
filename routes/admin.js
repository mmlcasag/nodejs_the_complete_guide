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
// this is the old method
// this is not going to be used anymore
router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);
// instead we are going to use this one
// the browser only understands get and post methods
// but since we are using a client-side javascript code
// we can use other http methods, like put and delete
router.delete('/product/:id', authMiddleware, adminController.deleteProduct);

module.exports = router;