module.exports.getErrorPage = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Error',
        path: '/error',
        isLoggedIn: req.session.isLoggedIn
    });
}