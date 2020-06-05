const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    const dirfile = path.join(__dirname, '..', 'views', 'add-product.html');
    res.sendFile(dirfile);
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

module.exports = router;