const bcrypt = require('bcryptjs');

const User = require('../models/user');

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

    // first let's find if there's another user with that same email address
    User.findOne({ email: email})
        .then(user => {
            // now let's check the argument returned by the method

            // if it is defined, it means there's already a user by that email address
            if (user) {
                // so let's redirect to login page

                // what if we want to send a message to the login page?
                // sending messagens via res.render() never was a problem
                // you just pass it as an argument and that's it

                // but what if i want to do that in a res.redirect()
                // res.redirect creates a new request
                // so how do we define a message to be sent across requests?

                // we can store a message in the session
                // but then don't want to keep it there stored
                // we want to store it in the session
                // and then delete it as soon as it is displayed to the user

                // turns out there's a package that does just that
                // npm install --save connect-flash
                // we call them flash messages

                // connect-flash is really simple to use
                // first of all we need to import it and initialize it on our app.js
                // then we can create a flash message like this:
                req.flash('message', 'You have already signed up to our shop. You should now log in instead.');
                // now we have a flash message stored in the session
                // and it is available until we use it
                // so let's display it in the login page
                // so first let's edit our signup controller
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
        message: req.flash('message') // this is how we fetch the flash message and send it to the view
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    // now we have to search on the database for a user with same email address as provided here
    User.findOne({ email: email })
        .then(user => {
            // the user variable holds the result of the query

            // if user is defined, it means it found the user, so we can proceed with the login
            if (user) {
                // let's check if the password provided is correct
                // how to do this, since our password is encrypted
                // and we can't decrypt the stored password?
                // now we use bcrypt again
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        // bcrypt returns a boolean saying if the passwords match
                        
                        // if they do match, then everything is fine, proceed with the login
                        if (doMatch) {
                            // store the user as an attribute in the session
                            req.session.user = user;
                            // store also an attribute named isLoggedIn in the session
                            req.session.isLoggedIn = true;
                            // store the session in the database
                            req.session.save(() => {
                                // when everything is done, redirect the user to the home page
                                // now the user is logged in! \o/
                                res.redirect('/');
                            });
                        // if they don't match, then try again
                        } else {
                            // redirect to the login form once again
                            res.redirect('/auth/login');    
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            // if user is undefined, it means it could not find the user
            } else {
                // in that case, let's simply redirect to sign up
                res.redirect('/auth/signup');
            }
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