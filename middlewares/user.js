const User = require('../models/user');

module.exports = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user._id)
            .then(user => {
                if (!user) {
                    return next();
                }
                req.user = user;
                next();
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    } else {
        return next();
    }
}