const express = require('express');

// VALIDATION
// first we need to install this package
// npm install express-validator --save
// once it is installed we have to import it
// and then we are ready to use it
// and since this is a big object
// we might want to destructure it
// we are only interested in the check attribute of the validator object
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);
// now we want to add some validation to the postSignup method
// and how do we do that?
// we simply add a check for that
// so let's say we want to validate the email field
// and check if the value provided is really a valid email address
router.post('/signup', 
    check('email')
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
    }),
    check('password')
    .isLength({ min: 8 }).withMessage('Your password must be at least 8 characters long')
    .isAlphanumeric().withMessage('Your password should contain only numbers and text'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('The password confirmation does not match');
        }
        return true;
    }),
    authController.postSignup
);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
router.get('/update-password/:token', authController.getUpdatePassword);
router.post('/update-password', authController.postUpdatePassword);
router.post('/logout', authController.postLogout);

module.exports = router;