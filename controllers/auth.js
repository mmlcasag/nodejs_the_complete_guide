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
                req.flash('error', 'You are already signed up to our shop.');
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
                        req.flash('success', 'You have signed up to our shop.');
                        req.flash('success', 'You should now proceed to the log in page.');
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
    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/auth/login'
    });
}

module.exports.postResetPassword = (req, res, next) => {
    
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}