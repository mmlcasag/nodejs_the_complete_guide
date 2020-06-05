const express = require('express');

const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', { pageTitle: 'Shop Page', path: '/', products: admin.products });
});

module.exports = router;