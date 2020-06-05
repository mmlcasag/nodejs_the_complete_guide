// you have to import express again here
const express = require('express');

// this is like a mini express app
// pluggable to the main app
// which i can export it to the main app
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<h1>This is our "Main" page</h1>');
});

// here I export it
module.exports = router;