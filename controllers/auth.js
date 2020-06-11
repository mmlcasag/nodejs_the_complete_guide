module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        isLoggedIn: req.isLoggedIn
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    req.isLoggedIn = true;

    res.redirect('/');
}