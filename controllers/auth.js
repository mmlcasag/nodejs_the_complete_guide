const User = require('../models/user');

module.exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/auth/signup',
        isLoggedIn: req.session.isLoggedIn
    });
}

module.exports.postSignup = (req, res, next) => {
    
}

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        isLoggedIn: req.session.isLoggedIn
    });
}

module.exports.postLogin = (req, res, next) => {
    User.findById('5ee23237956ed626eca64fca')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save(() => {
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}