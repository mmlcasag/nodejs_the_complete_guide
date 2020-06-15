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
                // throwing errors inside async code does not work
                // throw new Error(err);
                // instead, we should throw the error like this:
                return next(err);
                // async code is inside .then() and .catch() blocks, promises and callbacks.
            });
    } else {
        // on the other hand, if you throw an error inside a sync part of your code
        // it will work and it will be redirect to our special error handling middleware
        // throw new Error(err);
        return next();
    }
}