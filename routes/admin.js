const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/products', authMiddleware, adminController.getProducts);

router.get('/add-product', authMiddleware, adminController.getAddProduct);

router.post('/add-product', [
    body('title')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('author')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters long'),
    body('image')
        .trim()
        .isURL().withMessage('Image must be a valid URL'),
    body('price')
        .isFloat().withMessage('Price must be a numeric value greater than zero'),
    body('description')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),
], authMiddleware, adminController.postAddProduct);

router.get('/edit-product/:id', authMiddleware, adminController.getEditProduct);

router.post('/edit-product', [
    body('title')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('author')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters long'),
    body('image')
        .trim()
        .isURL().withMessage('Image must be a valid URL'),
    body('price')
        .isFloat().withMessage('Price must be a numeric value greater than zero'),
    body('description')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),
], authMiddleware, adminController.postEditProduct);

router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);

module.exports = router;