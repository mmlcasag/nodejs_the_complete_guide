// you have to import express again here
const express = require('express');

// this is like a mini express app
// pluggable to the main app
// which i can export it to the main app
const router = express.Router();

// you just have to change app for router
// remember? app is the app
// router is a mini app
// so replace app for router
// and then export the router to be used by app
router.get('/add-product', (req, res, next) => {
    res.send('<html><body><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form></body></html>');
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

// here I export it
module.exports = router;