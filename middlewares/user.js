const User = require('../models/user');

module.exports = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user._id)
            .then(user => {
                // we added an extra check
                // we could have a user stored in the session
                // but not anymore in the database
                // therefore, there might no return an user to be returned here
                if (!user) {
                    return next();
                }
                req.user = user;
                next();
            })
            .catch(err => {
                // just logging the error is not that useful
                // it is better to throw another error
                // so it can be handled by some other method
                throw new Error(err);
            });
    } else {
        return next();
    }
}