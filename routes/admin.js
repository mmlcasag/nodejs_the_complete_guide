const express = require('express');

const router = express.Router();

// GET /admin/add-product
router.get('/add-product', (req, res, next) => {
    res.send('<html><body><form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form></body></html>');
});

// POST /admin/product
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

module.exports = router;