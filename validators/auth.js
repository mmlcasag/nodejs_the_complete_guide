const { check } = require('express-validator');

const User = require('../models/user');

module.exports.postSignupValidator = [
    check('email')
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid e-mail address')
        .custom((value, { req }) => {
            if (value === 'test@test.com') {
                throw new Error('This email has been banned from our shop');
            }
            return true;
        })
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(user => {
                    if (user) {
                        return Promise.reject('You have already signed up to our shop');
                    }
                })
        }),
    check('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long'),
    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The password confirmation does not match');
            }
            return true;
        })
];

module.exports.postLoginValidator = [
    check('email')
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid e-mail address')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(user => {
                    if (!user) {
                        return Promise.reject('User not found in the database');
                    }
                })
        }),
    check('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long')
];