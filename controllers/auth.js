const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/auth/signup',
        isLoggedIn: req.session.isLoggedIn
    });
}

module.exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // first let's find if there's another user with that same email address
    User.findOne({ email: email})
        .then(user => {
            // now let's check the argument returned by the method

            // if it is defined, it means there's already a user by that email address
            if (user) {
                // so let's redirect to login page
                return res.redirect('/auth/login');
            // if it doesn't, it means there's no user yet and so this one can proceed
            } else {
                // before saving the new user we need to work on the password
                // storing password without encryption is a huge security flaw!!!
                // we must always encrypt the password
                // to do that, let's import the bcryptjs package
                // npm install --save bcryptjs
                // bcryptjs helps us encrypting our passwords
                // first argument is the string you want to encrypt
                // second argument is the number of rounds
                // the higher the more secure, but also takes more time
                // also it returs a promise
                // to let's return it to nest another then() block
                return bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        // now let's create it!
                        const newUser = new User({
                            email: email,
                            password: hashedPassword,
                            cart: { items: [] }
                        });
                        return newUser.save();
                    })
                    .then(result => {
                        // after signing up, we want to redirect the user to the login page
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