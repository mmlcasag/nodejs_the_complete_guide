module.exports.getErrorPage = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Error Page',
        path: '/error'
    });
}