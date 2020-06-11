module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        isLoggedIn: isLoggedIn
    });
}

module.exports.postLogin = (req, res, next) => {
    res.redirect('/');
}