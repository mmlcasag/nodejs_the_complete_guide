const express = require('express');

const authController = require('../controllers/auth');
const authValidators = require('../validators/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);
router.post('/signup', authValidators.postSignupValidator, authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authValidators.postLoginValidator, authController.postLogin);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
router.get('/update-password/:token', authController.getUpdatePassword);
router.post('/update-password', authController.postUpdatePassword);
router.post('/logout', authController.postLogout);

module.exports = router;