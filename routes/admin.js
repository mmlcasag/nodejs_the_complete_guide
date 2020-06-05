const express = require('express');

const path = require('path');

const root = require('../utils/root');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    const dirfile = path.join(root, 'views', 'add-product.html');
    res.sendFile(dirfile);
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

module.exports = router;