const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
    res.render('404', {
        pageTitle: '404 Page',
        path: '/error'
    });
});

module.exports = router;