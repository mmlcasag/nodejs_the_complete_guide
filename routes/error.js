const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
    // handlebars forbids logic inside the view
    const attributes = {
        pageTitle: '404 Page',
        formsCss: false,
        productCss: false,
        activeMenuShop: false,
        activeMenuProd: false,
        path: '/error'
    };
    res.render('404', attributes);
});

module.exports = router;