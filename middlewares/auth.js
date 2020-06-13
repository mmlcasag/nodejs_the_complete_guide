// now we are wrapping our validation if the user is logged it
// inside a middleware
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    next();
}