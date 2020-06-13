const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const nodemailer = require('../utils/nodemailer');

module.exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/auth/signup'
    });
}

module.exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email})
        .then(user => {
            if (user) {
                req.flash('error', 'You have already signed up to our shop.');
                req.flash('error', 'You should log in instead of sign up.');
                return res.redirect('/auth/login');
            } else {
                return bcrypt.hash(password, 10)
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
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.user = user;
                            req.session.isLoggedIn = true;
                            req.session.save(() => {
                                res.redirect('/');
                            });
                        } else {
                            req.flash('error', 'Invalid password.');
                            res.redirect('/auth/login');    
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                req.flash('error', 'Invalid user.');
                res.redirect('/auth/signup');
            }
        })
        .catch(err => {
            console.log(err);
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

    // to generate a token we are going to use crypto
    // which is a built in express package
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            req.flash('error', 'Error trying to generate a token.');
            return res.redirect('/auth/reset-password');
        } else {
            const token = buffer.toString('hex');

            // this token should be stored in the database
            // so let's create the field in the model
            User.findOne({email: email})
                .then(user => {
                    if (!user) {
                        req.flash('error', 'Invalid user.');
                        return res.redirect('/auth/reset-password');
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpiration = Date.now() + 3600000; // 1 hour in miliseconds
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
                    console.log(err);
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
            console.log(err);
        });
}

module.exports.postUpdatePassword = (req, res, next) => {
    
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}