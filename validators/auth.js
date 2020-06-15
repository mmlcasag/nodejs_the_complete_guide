const { check } = require('express-validator');

const User = require('../models/user');

module.exports.postSignupValidator = [
    check('email')
        .normalizeEmail() // sanitizers // lowercase the email
        .isEmail().withMessage('Please enter a valid e-mail address')
        // what if we want to add our custom validations?
        .custom((value, { req }) => {
            // let's say if the user types test@test.com
            // my validation should consider this email invalid
            // we can do this:
            if (value === 'test@test.com') {
                // we always have to throw an error on our validation
                throw new Error('This email has been banned from our shop');
            }
        
            // and always return true otherwise
            return true;
        })
        .custom((value, { req }) => {
            // we also want to check if the user already exists in the database
            // so we can remove this validation from our controller
            return User.findOne({ email: value })
                .then(user => {
                    if (user) {
                        // no more flash messages
                        // no more return true when dealing with async functions
                        // in this case, express waits for the return of the Promise
                        // if it gets rejected, it means there was a validation error
                        // if it does not, it means the validation was successful
                        return Promise.reject('You have already signed up to our shop');
                    }
                })
        }),
    check('password')
        // sanitizers
        .trim() // remove excess whitespaces
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long'),
    check('confirmPassword')
        // sanitizers
        .trim() // remove excess whitespaces
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The password confirmation does not match');
            }
            return true;
        })
];

module.exports.postLoginValidator = [
    check('email')
        .normalizeEmail() // sanitizers // lowercase the email
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
        // sanitizers
        .trim() // remove excess whitespaces    
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long')
];