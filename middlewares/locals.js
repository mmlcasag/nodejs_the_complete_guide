module.exports = (req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.messages = req.flash('message'),
    res.locals.errorMessages = req.flash('error'),
    res.locals.successMessages = req.flash('success'),
    next();
}