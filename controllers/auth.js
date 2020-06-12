const User = require('../models/user');

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        isLoggedIn: req.session.isLoggedIn
    });
}

module.exports.postLogin = (req, res, next) => {
    // our session package added this session object
    // and here we can add any key we want
    // for example:
    // req.session.isLoggedIn = true;
    // you can see after sign in that the session package
    // created a cookie with your session id
    // this value is just for you and will be valid until you close your browser
    
    // you can see here your session object with the attribute we just added
    // console.log(req.session);

    // this is all very good
    // but how do I access the information I recorded in the session?
    // const isLoggedIn = req.session.isLoggedIn;
    // okay! so now let's adapt how we send the loggedIn information for our views

    // ACTIVITY 5
    // after the user logged in
    // store the user object in the session
    User.findById('5ee23237956ed626eca64fca')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.postLogout = (req, res, next) => {
    // here I want to clean out my session
    // how do I do that?
    req.session.destroy(err => {
        // I also want to delete the cookie
        // how do I do that?
        // you don't do it!
        // the purpose of the cookie is to communicate with the session in the database
        // since there's no session in the database anymore, the cookie is now invalid
        // also, when you close the browser, the cookie will be deleted
        res.redirect('/');
    });
}