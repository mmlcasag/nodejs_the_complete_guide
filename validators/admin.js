const { body } = require('express-validator');

module.exports.postAddProductValidator = [
    body('title')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('author')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters long'),
    body('price')
        .isFloat().withMessage('Price must be a numeric value greater than zero'),
    body('description')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long')
];

module.exports.postEditProductValidator = [
    body('title')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('author')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters long'),
    body('price')
        .isFloat().withMessage('Price must be a numeric value greater than zero'),
    body('description')
        .trim()
        .isString()
        .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long')
];