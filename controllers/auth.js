const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const nodemailer = require('../utils/nodemailer');

module.exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/auth/signup',
        validationErrors: [],
        formData: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
}

module.exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Sign Up',
            path: '/auth/signup',
            validationErrors: validationErrors,
            formData: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            }
        });
    }

    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const newUser = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return newUser.save();
        })
        .then(result => {
            return nodemailer.sendMail({
                to: email,
                from: 'mmlcasag@gmail.com',
                subject: 'Welcome to our shop!',
                html: '<h1>You have successfully signed up to our shop</h1>'
            });
        })
        .then(result => {
            req.flash('success', 'Thanks for having signed up to our shop.');
            res.redirect('/auth/login');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        validationErrors: [],
        formData: {
            email: '',
            password: ''
        }
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            path: '/auth/login',
            validationErrors: validationErrors,
            formData: {
                email: email,
                password: password
            }
        });
    }
    
    User.findOne({ email: email })
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        req.session.save(() => {
                            res.redirect('/');
                        });
                    } else {
                        return res.status(422).render('auth/login', {
                            pageTitle: 'Login',
                            path: '/auth/login',
                            validationErrors: [{ value: password, msg: 'Invalid password', param: 'password', location: 'body' }],
                            formData: {
                                email: email,
                                password: password
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.getResetPassword = (req, res, next) => {
    res.render('auth/reset-password', {
        pageTitle: 'Reset Password',
        path: '/auth/login'
    });
}

module.exports.postResetPassword = (req, res, next) => {
    const email = req.body.email;

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            req.flash('error', 'Error trying to generate a token.');
            return res.redirect('/auth/reset-password');
        } else {
            const token = buffer.toString('hex');

            User.findOne({email: email})
                .then(user => {
                    if (!user) {
                        req.flash('error', 'Invalid user.');
                        return res.redirect('/auth/reset-password');
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpiration = Date.now() + 3600000;
                    user.save()
                        .then(result => {
                            console.log('URL: http://localhost:3000/auth/update-password/' + token);
                            
                            return nodemailer.sendMail({
                                to: email,
                                from: 'mmlcasag@gmail.com',
                                subject: 'Reset Password',
                                html: '<p>You requested a password reset</p><p>Click <a href="http://localhost:3000/auth/update-password/' + token + '">this link</a> to set a new password.</p>'
                            });
                        })
                        .then(result => {
                            req.flash('success', 'We have sent you a link to change your password.');
                            req.flash('success', 'Check out your e-mail.');
                            return res.redirect('/auth/reset-password');
                        });
                })
                .catch(err => {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                });
        }
    });
}

module.exports.getUpdatePassword = (req, res, next) => {
    const token = req.params.token;
    
    User.findOne({ resetPasswordToken: token, resetPasswordExpiration: {$gt: Date.now()} })
        .then(user =>{
            if (!user) {
                req.flash('error', 'Token invalid or expired');
                return res.redirect('/auth/reset-password');
            }
            res.render('auth/update-password', {
                pageTitle: 'Update Password',
                path: '/auth/login',
                token: token
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.postUpdatePassword = (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (confirmPassword !== password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/auth/update-password/' + token);
    }

    User.findOne({ resetPasswordToken: token, resetPasswordExpiration: {$gt: Date.now()} })
        .then(user => {
            if (!user) {
                req.flash('error', 'Token invalid or expired');
                return res.redirect('/auth/reset-password');
            }

            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    user.password = hashedPassword;
                    user.resetPasswordExpiration = undefined;
                    user.resetPasswordToken = undefined;

                    return user.save();
                })
                .then(result => {
                    req.flash('success', 'Your password has been updated');
                    return res.redirect('/auth/login');
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        }
        res.redirect('/');
    });
}